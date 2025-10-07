<?php

namespace App\Http\Controllers\api;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use App\Http\Controllers\api\BaseController as BaseController;
use App\Models\EmergencyReport;
use App\Models\EmergencyResponse;
use Illuminate\Support\Facades\Http;


class ExportReportController extends BaseController
{

    private function getAddressFromCoordinates($lat, $lon)
    {
        try {
            $response = Http::withHeaders([
                'User-Agent' => 'KCERA-App/1.0 (shemregidor6@gmail.com)'
            ])->get('https://nominatim.openstreetmap.org/reverse', [
                        'lat' => $lat,
                        'lon' => $lon,
                        'format' => 'json',
                        'addressdetails' => 1
                    ]);

            if ($response->successful()) {
                $data = $response->json();
                $address = $data['address'] ?? [];

                return [
                    'street' => $address['road'] ?? $address['suburb'] ?? '',
                    'city' => $address['city'] ?? $address['town'] ?? $address['village'] ?? '',
                    'state' => $address['state'] ?? '',
                    'country' => $address['country'] ?? '',
                ];
            }
        } catch (\Exception $e) {
            \Log::error('Nominatim API error: ' . $e->getMessage());
        }

        return [
            'street' => '',
            'city' => '',
            'state' => '',
            'country' => '',
        ];
    }

    public function exportReport(Request $request): JsonResponse
    {
        $date = $request['date'];

        $report = EmergencyReport::with('user')
            ->where('created_at', 'like', "%$date%")
            ->get()
            ->map(function ($report) {
                return [
                    "id" => $report->id,
                    "reporter" => $report->user->name,
                    "incident" => $report->request_type,
                    "location" => $this->getAddressFromCoordinates(floatval($report->latitude), floatval($report->longitude)),
                    "date" => $report->created_at->format('Y-m-d H:i:s')
                ];
            });

        $response = EmergencyResponse::with('driver')
            ->where('created_at', 'like', "%$date%")
            ->get()
            ->map(function ($response) {
                return [
                    "id" => $response->id,
                    "emergency id" => $response->request_id,
                    "responder" => $response->driver->name,
                    "date" => $response->created_at->format('Y-m-d H:i:s')
                ];
            });




        $data = [
            'reports' => $report,
            'responses' => $response
        ];

        return $this->sendResponse($data, 'return json response');
    }

}
