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

        $results->transform(function ($item) {
            $item->emergency_photo = 'http://localhost:8000/storage/' . $item->request_photo;
            return $item;
        });

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
            ->orWhere('request_status', 'verified')
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

        $this->notificationRecord([
            'receiver_id' => null,
            'report_id' => $emergencyReport->id,
            'response_id' => null,
            'receiver_type' => 'everyone',
            'type' => 'emergency',
            'title' => "🚨 New {$request->request_type} Reported",
            'message' => "A new {$request->request_type} emergency has been reported. Stay alert and safe.",
        ]);


        $logs = [
            'user_id' => $user['id'],
            'user_role' => $user['role'],
            'action' => 'Submitted an emergency request'
        ];

        $this->insertSystemLogs($logs);

        return $this->sendResponse(['photo_url' => $publicUrl], 'Emergency request submitted successfully.');
    }

    public function verifyEmergency(string $id): JsonResponse
    {

        $user = Auth::user();
        $emergencyRecord = EmergencyReport::find($id);

        if (!$emergencyRecord) {
            return $this->sendError('Cannot find emergency', []);
        }

        $emergencyRecord->request_status = 'verified';

        $emergencyRecord->save();

        $this->notificationRecord([
            'receiver_id' => $emergencyRecord->user_id,
            'report_id' => $emergencyRecord->id,
            'response_id' => null,
            'receiver_type' => 'reporter',
            'type' => 'verified emergency',
            'title' => "Emergency Reported Verified",
            'message' => "Your reported incident on {$emergencyRecord->created_at->format('F j, Y g:i A')} has been verified by the dispatcher. Response in progress",
        ]);

        $logs = [
            'user_id' => $user['id'],
            'user_role' => $user['role'],
            'action' => "Verified an emergency request ( id: $id )"
        ];

        $this->insertSystemLogs($logs);

        return $this->sendResponse([], 'Verified Successfully');
    }

    public function rejectEmergency(string $id): JsonResponse
    {
        $user = Auth::user();
        $emergencyRecord = EmergencyReport::find($id);

        if (!$emergencyRecord) {
            return $this->sendError('Cannot find emergency', []);
        }

        $emergencyRecord->request_status = 'rejected';

        $emergencyRecord->save();

        $this->notificationRecord([
            'receiver_id' => $emergencyRecord->user_id,
            'report_id' => $emergencyRecord->id,
            'response_id' => null,
            'receiver_type' => 'reporter',
            'type' => 'rejected emergency',
            'title' => "Emergency Reported Rejected",
            'message' => "Your reported incident on {$emergencyRecord->created_at->format('F j, Y g:i A')} has been rejected by the dispatcher.",
        ]);


        $logs = [
            'user_id' => $user['id'],
            'user_role' => $user['role'],
            'action' => "Rejected an emergency request ( id: $id )"
        ];

        $this->insertSystemLogs($logs);

        return $this->sendResponse([], 'Rejected Successfully');
    }


}
