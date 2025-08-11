<?php

namespace App\Http\Controllers\api;

use App\Mail\ApprovalMail;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use App\Models\User;
use App\Http\Controllers\api\BaseController as BaseController;
use Illuminate\Support\Facades\Auth;
use Validator;
use Illuminate\Support\Facades\Mail;




class UserManagementController extends BaseController
{
    public function index(Request $request): JsonResponse
    {
        $user_role = $request->input('role');
        $user_status = $request->input('status');
        $user_approval_status = $request->input('approval_status');
        $keyword = $request->input('keyword');

        $users = User::with('profilePicture')
            ->when($user_status, fn($query) => $query->where('status', $user_status))
            ->when($user_role, fn($query) => $query->where('role', $user_role))
            ->when($user_approval_status, fn($query) => $query->where('approval_status', $user_approval_status))
            ->when($keyword, function ($query) use ($keyword) {
                $query->where(function ($q) use ($keyword) {
                    $q->where('name', 'like', "%{$keyword}%")
                        ->orWhere('email', 'like', "%{$keyword}%");
                });
            })
            ->orderByDesc('created_at')
            ->get();

        foreach ($users as $user) {

            $user->front_id_photo = $user->front_id_photo
                ? url('/public-image/id_photos/' . basename($user->front_id_photo))
                : null;

            $user->back_id_photo = $user->back_id_photo
                ? url('/public-image/id_photos/' . basename($user->back_id_photo))
                : null;

            $user->face_photo = $user->face_photo
                ? url('/public-image/face_photos/' . basename($user->face_photo))
                : null;
        }

        if ($users->count() === 0) {
            return $this->sendError('No user to display', []);
        }

        return $this->sendResponse($users, 'list of users');

    }

    public function approveUser(Request $request, string $id): JsonResponse
    {
        $user = User::find($id);

        if (!$user) {
            return $this->sendError('User not found', []);
        }

        if ($user->approval_status === 'approved') {
            return $this->sendError('User already approved', []);
        }

        $user->approval_status = 'approved';
        $user->save();


        Mail::to($user->email)->send(new ApprovalMail($user->name));
        return $this->sendResponse([], 'User approved successfully');

    }

    public function rejectUser(Request $request, string $id): JsonResponse
    {
        $user = User::find($id);

        if (!$user) {
            return $this->sendError('User not found', []);
        }

        if ($user->approval_status === 'rejected') {
            return $this->sendError('User already rejected', []);
        }

        $user->approval_status = 'rejected';
        $user->save();

        return $this->sendResponse([], 'User rejected successfully');
    }

    public function getUserInformation(Request $request): JsonResponse
    {
        $user = Auth::user();

        if (!$user) {
            return $this->sendError([], 'Cannot find user data');
        }

        return $this->sendResponse($user, 'User Data Retrieved Successfully');
    }
}
