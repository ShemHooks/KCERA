<?php

namespace App\Http\Controllers\api;

use App\Models\EmergencyReport;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\api\BaseController;

class AnalyticsController extends BaseController
{
    public function summary(): JsonResponse
    {
        $response = [
            'total_reports' => EmergencyReport::count(),
            'pending' => EmergencyReport::where('request_status', 'pending')->count(),
            'in_progress' => EmergencyReport::where('request_status', 'in_progress')->count(),
            'completed' => EmergencyReport::where('request_status', 'completed')->count(),
            'rejected' => EmergencyReport::where('request_status', 'rejected')->count(),
        ];

        return $this->sendResponse($response, 'summary');
    }


    public function byType(): JsonResponse
    {
        $data = EmergencyReport::select('request_type', DB::raw('COUNT(*) as total'))
            ->groupBy('request_type')
            ->get();

        return $this->sendResponse($data, 'analytics per type');
    }

    public function monthly(): JsonResponse
    {
        $data = EmergencyReport::select(
            DB::raw("DATE_FORMAT(request_date, '%Y-%m') as month"),
            DB::raw("COUNT(*) as total")
        )
            ->groupBy('month')
            ->orderBy('month')
            ->get();

        return $this->sendResponse($data, 'analytics per month');
    }

    public function topUsers(): JsonResponse
    {
        $data = EmergencyReport::select('user_id', DB::raw('COUNT(*) as total'))
            ->groupBy('user_id')
            ->orderBYDesc('total')
            ->with('user:id,name')
            ->take(5)
            ->get();

        return $this->sendResponse($data, 'top users');
    }
}
