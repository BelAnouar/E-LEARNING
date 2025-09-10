<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\CoursController;
use App\Http\Controllers\Api\FileController;
use App\Http\Controllers\Api\PayementController;
use App\Http\Controllers\Api\UsersController;
use App\Http\Controllers\Api\WeeksController;
use App\Http\Controllers\ApplicationController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ProgramController;

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
  Route::post('/create-payment-intent', [PayementController::class, 'createPaymentIntent']);
  Route::post('/payment-success', [PayementController::class, 'handleSuccess']);
      Route::get('/check-course-access/{courseId}', [PayementController::class, 'checkCourseAccess']);
    
   Route::apiResource("/File",FileController::class);
   Route::get('/files/week/{idWeek}', [FileController::class, 'getFilesByWeek']);

   Route::get('/dashboard/stats', [DashboardController::class, 'getStatistics']);
    Route::get('/dashboard/user-growth', [DashboardController::class, 'getUserGrowth']);
    Route::get('/dashboard/course-popularity', [DashboardController::class, 'getCoursePopularity']);
    Route::get('/dashboard/revenue', [DashboardController::class, 'getRevenue']);
    Route::get('/dashboard/recent-activity', [DashboardController::class, 'getRecentActivity']);  Route::controller(ProgramController::class)->prefix('programs')->name('programs.')->group(function () {
      
        Route::get('/', 'index')->name('index');
        
       
        Route::post('/', 'store')->name('store');
        
       
        Route::get('/{program}', 'show')->name('show')->where('program', '[0-9]+');
        
     
        Route::put('/{program}', 'update')->name('update')->where('program', '[0-9]+');
        
    
        Route::delete('/{program}', 'destroy')->name('destroy')->where('program', '[0-9]+');
    });
});


Route::post("/signup",[AuthController::class,"signup"]);
Route::post("/login",[AuthController::class,"login"]);
Route::get("/login",[AuthController::class,"islogin"])->name("login");




  
    

    Route::controller(CategoryController::class)->prefix('categories')->name('categories.')->group(function () {
       
        Route::get('/', 'index')->name('index');
        

        Route::post('/', 'store')->name('store');
        
       
        Route::get('/popular', 'popular')->name('popular');
    
        Route::get('/with-programs', 'withPrograms')->name('with-programs');
        
       
        Route::get('/statistics', 'statistics')->name('statistics');

        Route::get('/{category}', 'show')->name('show')->where('category', '[0-9]+');
       
        Route::put('/{category}', 'update')->name('update')->where('category', '[0-9]+');
    
        Route::delete('/{category}', 'destroy')->name('destroy')->where('category', '[0-9]+');
    });
    
   
    Route::controller(ApplicationController::class)->prefix('applications')->name('applications.')->group(function () {
       
        Route::get('/', 'index')->name('index');
        
  
        Route::post('/', 'store')->name('store');
       
        Route::get('/statistics', 'statistics')->name('statistics');

        Route::get('/{application}', 'show')->name('show')->where('application', '[0-9]+');
     
        Route::put('/{application}', 'update')->name('update')->where('application', '[0-9]+');
        
        
        Route::put('/{application}/approve', 'approve')->name('approve')->where('application', '[0-9]+');
        
    
        Route::put('/{application}/reject', 'reject')->name('reject')->where('application', '[0-9]+');
        
        Route::delete('/{application}', 'destroy')->name('destroy')->where('application', '[0-9]+');
    });
    