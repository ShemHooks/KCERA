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
            'request_photo' => 'required|image|mimes:jpeg,png,jpg|max:10240'
        ]);

        if ($validator->fails()) {
            return $this->sendError('Validation Error.', $validator->errors());
        }

        $user = Auth::user();
        $lat = $request->latitude;
        $lng = $request->longitude;

        // Prevent duplicate recent nearby requests
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
            return $this->sendError('A nearby emergency request has already been submitted. Please wait for response teams.', [], 409);
        }


        $filePath = $request->file('request_photo')->store('uploads/request_photos', 'public');
        $publicUrl = asset('storage/' . $filePath);

        $emergencyReport = EmergencyReport::create([
            'user_id' => $user->id,
            'request_type' => $request->request_type,
            'request_status' => 'pending',
            'request_date' => now(),
            'latitude' => $lat,
            'longitude' => $lng,
            'request_photo' => $filePath,
        ]);

        if (!$emergencyReport) {
            return $this->sendError('Unable to submit emergency request.');
        }


        return $this->sendResponse(['photo_url' => $publicUrl], 'Emergency request submitted successfully.');
    }

}
