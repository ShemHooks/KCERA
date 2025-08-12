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

    public function index(Request $request)
    {
        $query = EmergencyReport::with('user');


        if ($request->filled('status')) {
            $query->where('request_status', $request->status);
        }

        if ($request->filled('request_type')) {
            $query->where('request_type', $request->request_type);
        }

        if ($request->filled('date_from')) {
            $query->whereDate('created_at', '>=', $request->date_from);
        }

        if ($request->filled('date_to')) {
            $query->whereDate('created_at', '<=', $request->date_to);
        }

        if ($request->filled('reporter_id')) {
            $query->where('reporter_id', $request->reporter_id);
        }

        if ($request->filled('responder_id')) {
            $query->where('responder_id', $request->responder_id);
        }

        if (
            $request->filled('lat_min') &&
            $request->filled('lat_max') &&
            $request->filled('lng_min') &&
            $request->filled('lng_max')
        ) {
            $query->whereBetween('latitude', [$request->lat_min, $request->lat_max])
                ->whereBetween('longitude', [$request->lng_min, $request->lng_max]);
        }

        $sortBy = $request->get('sort_by', 'created_at');
        $sortOrder = $request->get('sort_order', 'desc');

        $allowedSortFields = ['created_at', 'updated_at', 'priority_level', 'status'];
        if (!in_array($sortBy, $allowedSortFields)) {
            $sortBy = 'created_at';
        }

        if (!in_array(strtolower($sortOrder), ['asc', 'desc'])) {
            $sortOrder = 'desc';
        }

        $query->orderBy($sortBy, $sortOrder);


        $results = $query->get();

        return $this->sendResponse($results, 'Emergency Reports');
    }


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
            'request_photo' => $publicUrl,
        ]);

        if (!$emergencyReport) {
            return $this->sendError('Unable to submit emergency request.');
        }


        return $this->sendResponse(['photo_url' => $publicUrl], 'Emergency request submitted successfully.');
    }

}
