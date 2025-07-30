<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/public-image/{folder}/{filename}', function ($folder, $filename) {
    $allowedFolders = ['id_photos', 'face_photos']; // Optional: restrict access
    if (!in_array($folder, $allowedFolders)) {
        abort(403);
    }

    $path = storage_path("app/public/uploads/$folder/$filename");

    if (!File::exists($path)) {
        abort(404);
    }

    return Response::file($path);
});