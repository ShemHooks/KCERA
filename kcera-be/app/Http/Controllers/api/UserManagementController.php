<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use App\Models\User;
use App\Http\Controllers\api\BaseController as BaseController;
use Illuminate\Support\Facades\Auth;
use Validator;


class UserManagementController extends BaseController
{
    public function index(Request $request): JsonResponse
    {

        $user_role = $request->input('role');
        $user_status = $request->input('status');
        $user_approval_status = $request->input('approval_status');
        $keyword = $request->input('keyword');

        $users = User::with('profilePicture')
                ->when($user_status, fn ($query) => $query->where('status', $user_status))
                ->when($user_role, fn ($query) => $query->where('role', $user_role))
                ->when($user_approval_status, fn ($query) => $query->where('approval_status', $user_approval_status))
                ->when($keyword, function ($query) use ($keyword){
                    $query->where(function($q) use ($keyword) {
                        $q->where('name', 'like', "%{$keyword}%")
                            ->orWhere('email', 'like', "%{$keyword}%");
                    });
                })
                ->orderByDesc('created_at')
                ->get();
   

            if($users->count() === 0){
                return $this->sendError('No user to display', []);
            }

            return $this->sendResponse($users, 'list of users');
        

    }
}
