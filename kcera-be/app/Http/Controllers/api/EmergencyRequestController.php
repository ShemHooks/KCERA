<?php

namespace App\Http\Controllers\api;

use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use App\Models\EmergencyReport;
use App\Http\Controllers\api\BaseController as BaseController;
use Illuminate\Support\Facades\Auth;

class EmergencyRequestController extends BaseController
{
    public function submitRequest(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'request_type' => 'required|string|max:255',
            'latitude' => 'required|numeric',
            'longitude' => 'required|numeric',
            'request_photo' => 'nullable|mimes:jpeg,jpg,png'
        ]);

        if ($validator->fails()) {
            return $this->sendError('Validation Error.', $validator->errors());
        }

        $date = now();
        $user = Auth::user();
        $input = [
            'user_id' => $user->id,
            'request_type' => $request->request_type,
            'request_status' => 'pending',
            'request_date' => $date,
            'latitude' => $request->latitude,
            'longitude' => $request->longitude,
        ];

        if ($request->hasFile('request_photo')) {
            $input['request_photo'] = $request->file('request_photo')->store('uploads/request_photos', 'public');
        }

        $emergencyReport = EmergencyReport::create($input);
        if (!$emergencyReport) {
            return $this->sendError('Unable to submit emergency request', []);
        }

        return $this->sendResponse([], 'Emergency request submitted successfully');

    }
}
