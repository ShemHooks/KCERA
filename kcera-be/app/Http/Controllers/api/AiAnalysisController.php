<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\api\BaseController as BaseController;
use Illuminate\Http\JsonResponse;
use OpenAI\Laravel\Facades\OpenAI;
use Illuminate\Http\Request;
use App\Models\EmergencyReport;
use Illuminate\Support\Facades\Log;


class AiAnalysisController extends BaseController
{

    public function analyze(Request $request): JsonResponse
    {
        $question = $request->input('question');

        try {
            $summary = EmergencyReport::selectRaw('
            request_type,
            Month(created_at) as Month,
            COUNT(*) as total
        ')
                ->groupBy('request_type', 'month')
                ->get();

            usleep(300000);

            $response = OpenAI::chat()->create([
                'model' => 'gpt-4o-mini',
                'messages' => [
                    [
                        'role' => 'system',
                        'content' => 'You are an AI data analyst for the KCERA emergency response system. 
                                  You analyze JSON data of incident reports and answer clearly and concisely.'

                    ],
                    [
                        'role' => 'user',
                        'content' => "Data: " . $summary->toJson() . "\n\nQuestion: " . $question
                    ],
                ]
            ]);

            $answer = $response->choices[0]->message->content ?? 'Sorry I could not generate a response for a while';

            return $this->sendResponse($answer, 'Ai response');
        } catch (\Exception $e) {
            Log::error('AI Error: ' . $e->getMessage());
            return response()->json([
                'error' => 'OpenAI request failed: ' . $e->getMessage(),
            ], 429);
        }

    }

}
