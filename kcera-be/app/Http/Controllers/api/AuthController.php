<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use App\Models\User;
use App\Http\Controllers\api\BaseController as BaseController;
use Illuminate\Support\Facades\Auth;
use Validator;
use Illuminate\Support\Str;
use App\Mail\SendTemporaryPassword;

class AuthController extends BaseController
{
    public function register(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => 'required',
            'gender' => 'required',
            'phone' => 'required',
            'address' => 'required',
            'front_id_photo' => 'required|mimes:jpeg,jpg,png',
            'back_id_photo' => 'required|mimes:jpeg,jpg,png',
            'face_photo' => 'required|mimes:jpeg,jpg,png'
        ]);

        if($validator->fails()){
            return $this->sendError('validation Error.', $validator->errors());
        }

        $input = [
            'name' => $request->name,
            'email' => $request->email,
            'password' => bcrypt($request->password),
            'gender' => $request->gender,
            'phone' => $request->phone,
            'address' => $request->address,
        ];

        $input['front_id_photo'] = $request->file('front_id_photo')->store('uploads/id_photos', 'public');
        $input['back_id_photo'] = $request->file('back_id_photo')->store('uploads/id_photos', 'public');
        $input['face_photo'] = $request->file('face_photo')->store('uploads/face_photos','public');

        $user = User::create($input);

        if(!$user){
            return $this->sendError('Unable to process registration', []);
        }

        return $this->sendResponse($user, 'Registration Successful');

    } 

    public function login(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required'
        ]);

        if($validator->fails()){
            return $this->sendError('Validation Error', $validator->errors());
        }

        if(Auth::attempt(['email' => $request->email, 'password' => $request->password])){

            $user = Auth::user();

        if ($user->approval_status === 'pending') {
            return $this->sendResponse([
                'approval' => 'pending',
                'token' => null
            ], 'Account is pending');
        }


            $success['token'] = $user->createToken('Authenticated')->plainTextToken;
            $success['name'] = $user->name;
            $success['role'] = $user->role;

            return $this->sendResponse($success, 'User Login Successfully');

        }

        
    }

    public function registerEmployees(Request $request): JsonResponse
    {
         $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'gender' => 'required',
            'role' => 'required',
            'address' => 'required',
         ]);

         if($validator->fails()){
            return $this->sendError('Validation Error', $validator->errors());
         }

         $input = $request->all();
         $temp_password = Str::random(8);
         $input['password'] = bcrypt($temp_password);
         $input['required_change_pass'] = true;
         $input['approval_status'] = 'approved';

         $user = User::create($input);

         Mail::to($user->email)->send(new SendTemporaryPassword($user->name, $temp_password));

         return $this->sendResponse([], 'User Created Succefully');
    }

    public function changePassword(Request $request): JsonResponse
    {
        $user = Auth::user();

        $validator = Validator::make($request->all(), [
            'temp_password' => 'required',
            'new_password' => 'required|string|min:8'
        ]);

        if($validator->fails()){
            return $this->sendError('Validation Error', $validator->errors());
        }

         if (!Hash::check($request->input('temp_password'), $user->password)) {
        return $this->sendError('Invalid temporary password', ['error' => 'Temporary password is incorrect.']);
    }

    if(Hash::check($request->input('new_password'), $user->password)){
        return $this->sendError('Detected Reusing of Password', ['error' => 'New password must be different from the old password']);
    }

    $user->password = bcrypt($request->input('new_password'));
    $user->required_change = false;
    $user->password_changed_date = now();
    $user->save();

    return $this->sendResponse(null, 'Password changed successfully.');
    }

    public function logout(Request $request): JsonResponse
    {
        $request->user()->currentAccessToken()->delete();

        return $this->sendResponse(null, "User logged out successfully");
    }

}
