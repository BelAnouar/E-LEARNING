<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\CoursController;
use App\Http\Controllers\Api\FileController;
use App\Http\Controllers\Api\PayementController;
use App\Http\Controllers\Api\UsersController;
use App\Http\Controllers\Api\WeeksController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->group(function(){
    Route::post("/logout",[AuthController::class,"logout"]);
    Route::get('/user', function (Request $request) {
    return $request->user();
   });
   Route::apiResource('/users', UsersController::class);
   Route::apiResource("/cours",CoursController::class);
   Route::apiResource("/weeks",WeeksController::class);
   Route::apiResource("/payemment",PayementController::class);
   Route::apiResource("/File",FileController::class);
   
});


Route::post("/signup",[AuthController::class,"signup"]);
Route::post("/login",[AuthController::class,"login"]);
Route::get("/login",[AuthController::class,"islogin"])->name("login");




