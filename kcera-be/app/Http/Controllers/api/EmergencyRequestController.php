<?php

namespace App\Http\Controllers\api;

use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use App\Models\EmergencyReport;
use App\Http\Controllers\api\BaseController as BaseController;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Carbon;

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

        $user = Auth::user();
        $lat = $request->latitude;
        $lng = $request->longitude;

        $existing = EmergencyReport::select("*")
            ->selectRaw("(
                6371 * acos(
                    cos(radians(?)) *
                    cos(radians(latitude)) *
                    cos(radians(longitude) - radians(?)) +
                    sin(radians(?)) *
                    sin(radians(latitude))
                )
            ) AS distance", [$lat, $lng, $lat])
            ->where('request_status', 'pending')
            ->where('created_at', '>=', Carbon::now()->subMinutes(30))
            ->having("distance", "<=", 0.05)
            ->first();

        if ($existing) {
            return $this->sendError('A nearby emergency request has already been submitted. Please wait for response teams.');
        }

        $input = [
            'user_id' => $user->id,
            'request_type' => $request->request_type,
            'request_status' => 'pending',
            'request_date' => now(),
            'latitude' => $lat,
            'longitude' => $lng,
        ];

        if ($request->hasFile('request_photo')) {
            $input['request_photo'] = $request->file('request_photo')->store('uploads/request_photos', 'public');
        }

        $emergencyReport = EmergencyReport::create($input);
        if (!$emergencyReport) {
            return $this->sendError('Unable to submit emergency request.', []);
        }

        return $this->sendResponse([], 'Emergency request submitted successfully.');
    }
}
