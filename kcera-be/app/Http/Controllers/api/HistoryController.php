<?php

namespace App\Http\Controllers\api;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use App\Http\Controllers\api\BaseController as BaseController;
use App\Models\EmergencyReport;
use App\Models\EmergencyResponse;

class HistoryController extends BaseController
{
    public function index(Request $request): JsonResponse
    {
        $keyword = $request->input('keyword');

        // ---- Reports ----
        $reports = EmergencyReport::with('user')
            ->where('request_status', 'verified')
            ->when($keyword, function ($query) use ($keyword) {
                $query->where(function ($q) use ($keyword) {
                    $q->where('request_type', 'like', "%$keyword%")
                        ->orWhere('request_date', 'like', "%$keyword%")
                        ->orWhereHas('user', function ($uq) use ($keyword) {
                            $uq->whereAny(['name', 'email', 'phone', 'address'], 'like', "%$keyword%");
                        });
                });
            })
            ->orderBy('created_at', 'desc')
            ->get();

        // ---- Responses ----
        $responses = EmergencyResponse::with(['driver', 'report'])
            ->where('request_status', 'completed')
            ->when($keyword, function ($query) use ($keyword) {
                $query->where(function ($q) use ($keyword) {
                    $q->whereHas('driver', function ($dq) use ($keyword) {
                        $dq->whereAny(['name', 'email', 'phone'], 'like', "%$keyword%");
                    })
                        ->orWhereHas('report', function ($rq) use ($keyword) {
                            $rq->where('request_type', 'like', "%$keyword%")
                                ->orWhere('request_date', 'like', "%$keyword%")
                                ->orWhereHas('user', function ($uq) use ($keyword) {
                                    $uq->whereAny(['name', 'email', 'phone', 'address'], 'like', "%$keyword%");
                                });
                        });
                });
            })
            ->orderBy('created_at', 'desc')
            ->get();

        if ($reports->isEmpty() && $responses->isEmpty()) {
            return $this->sendError('No histories to display', [], 404);
        }

        return $this->sendResponse([
            'reports' => $reports,
            'responses' => $responses,
        ], 'Histories retrieved successfully');
    }
}
