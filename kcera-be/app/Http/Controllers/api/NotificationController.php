<?php

namespace App\Http\Controllers\api;

use App\Models\Notification;
use App\Http\Controllers\api\BaseController as BaseController;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Validator;
use App\Models\User;
use Illuminate\Support\Facades\Auth;



class NotificationController extends BaseController
{
    public function index(Request $request): JsonResponse
    {
        $notification = Notification::where(function ($q) {
            $q->where('receiver_id', Auth::id())
                ->where('receiver_type', 'reporter');
        })
            ->orWhere('receiver_type', 'everyone')
            ->orderBy('created_at', 'desc')
            ->get();

        return $this->sendResponse($notification, 'Notifications');
    }

}



