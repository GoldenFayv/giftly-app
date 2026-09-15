<?php

namespace App\Http\Controllers\Api\V1\Internal;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\File;

class LogController extends Controller
{
    public function __invoke(Request $request, string $pass, ?string $action = null): JsonResponse|Response
    {
        if ($pass !== "Pass") {
            abort(200, "Syke!!");
        }

        $path = storage_path('logs/laravel.log');

        if ($action && $action === 'clear') {
            // Clear the log file
            File::put($path, '');
            return response()->json([
                'data' => [
                    'logs' => [],
                    'message' => 'Syke!!',
                ],
            ]);
        }

        if (! file_exists($path)) {
            return response()->json([
                'data' => [
                    'logs' => [],
                    'message' => 'Log file does not exist.',
                ],
            ]);
        }
        $content = nl2br(trim(File::get($path)));

        return response()->make($content, 200)->header('Content-Type', 'text/html');
    }
}
