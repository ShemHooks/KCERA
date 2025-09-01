<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Models\Notification;

class BaseController extends Controller
{

    public function notificationRecord(array $data)
    {
        try {
            $notification = Notification::create($data);
            return $notification;
        } catch (\Exception $e) {
            \Log::error("Notification record failed: " . $e->getMessage());
            return null;
        }
    }



    public function sendResponse($result = null, $message)
    {
        $response = [
            'success' => true,
            'message' => $message,
        ];

        if ($result !== null) {
            $response['data'] = $result;
        }

        return response()->json($response, 200);
    }

    public function sendError($message, $errorData = [], $code = 404)
    {
        $response = [
            'success' => false,
            'message' => is_array($message) ? ($message['error'] ?? 'errpr') : $message
        ];

        if (!empty($errorData)) {
            $response['data'] = $errorData;
        }

        return response()->json($response, $code);
    }
}

