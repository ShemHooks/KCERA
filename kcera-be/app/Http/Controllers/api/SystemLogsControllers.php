<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\api\BaseController as BaseController;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use App\Models\SysetmLogs;

class SystemLogsControllers extends BaseController
{
    public function index(Request $request): JsonResponse
    {
        $keyword = $request->input('keyword');
        $date_range = $request->input('date_range');
        $isHidden = $request->input('is_hidden');
        $user_role = $request->input('user_role');

        $logs = SysetmLogs::with('users')
            ->when($isHidden !== null, function ($query) use ($isHidden) {
                $query->where('is_hidden', $isHidden);
            })
            ->when($user_role, function ($query) use ($user_role) {
                $query->whereHas('users', function ($q) use ($user_role) {
                    $q->where('role', $user_role);
                });
            })
            ->when($keyword, function ($query) use ($keyword) {
                $query->where(function ($q) use ($keyword) {
                    $q->where('action', 'like', "%$keyword%")
                        ->orWhereHas('users', function ($uq) use ($keyword) {
                            $uq->whereAny(['name', 'email'], 'like', "%$keyword%");
                        });
                });
            })
            ->when($date_range && count($date_range) === 2, function ($query) use ($date_range) {
                $query->whereBetween('created_at', [$date_range[0], $date_range[1]]);
            })
            ->orderByDesc('created_at')
            ->get();

        if ($logs->isEmpty()) {
            return $this->sendError('There are no logs to display', [], 404);
        }

        return $this->sendResponse($logs, 'Retrieved logs');
    }


    public function deleteLogs(string $id): JsonResponse
    {
        $log = SysetmLogs::find($id, 'id');

        $log->delete();

        return $this->sendResponse([], 'Deleted files successfully');

    }
}
