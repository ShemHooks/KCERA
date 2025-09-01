<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\api\BaseController as BaseController;
use App\Models\EmergencyResponse;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;

class EmergencyResponseController extends BaseController
{

    public function index(Request $request): JsonResponse
    {
        $response_id = $request->input['response_id'];

        $responses = EmergencyResponse::query()
            ->when($response_id, function ($query) use ($response_id) {
                $query->orWhere('id', $response_id);
            })
            ->where('request_status', 'in_transit')
            ->get();

        if ($responses === null) {
            return $this->sendError('There is no on-going response', [], 404);
        }

        return $this->sendResponse($responses, 'on-going responses');
    }

    public function createResponse(Request $request): JsonResponse
    {
        $user = Auth::user();

        $validator = Validator::make($request->all(), [
            "request_id" => "required|exists:emergency_reports,id",
            "current_latitude" => "required|numeric",
            "current_longitude" => "required|numeric"
        ]);

        if ($validator->fails()) {
            return $this->sendError("Validation Error", $validator->errors());
        }

        $existing = EmergencyResponse::where('driver_id', $user->id)
            ->where('request_status', "in_transit")
            ->first();

        if ($existing) {
            $existing->request_id = $request->request_id;
            $existing->current_latitude = $request->current_latitude;
            $existing->current_longitude = $request->current_longitude;
            $existing->save();

            return $this->sendResponse([], 'Responding to another emergency');

        }



        $response = EmergencyResponse::create([
            'driver_id' => $user->id,
            'request_id' => $request->request_id,
            'current_latitude' => $request->current_latitude,
            'current_longitude' => $request->current_longitude,
            'request_status' => 'in_transit',
        ]);
        return $this->sendResponse($response, 'Responding to Emergency');

    }

}
