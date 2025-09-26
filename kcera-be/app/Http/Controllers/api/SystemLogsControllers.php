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
        $date_range = $request->input('date_range'); // expect array: [start, end]
        $isHidden = $request->input('is_hidden');
        $user_role = $request->input('user_role');

        $logs = SystemLogs::with('user')
            ->when($isHidden !== null, function ($query) use ($isHidden) {
                $query->where('is_hidden', $isHidden);
            })
            ->when($user_role, function ($query) use ($user_role) {
                $query->whereHas('user', function ($q) use ($user_role) {
                    $q->where('role', $user_role);
                });
            })
            ->when($keyword, function ($query) use ($keyword) {
                $query->where(function ($q) use ($keyword) {
                    $q->where('action', 'like', "%$keyword%")
                        ->orWhereHas('user', function ($uq) use ($keyword) {
                            $uq->where('name', 'like', "%$keyword%")
                                ->orWhere('email', 'like', "%$keyword%");
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
