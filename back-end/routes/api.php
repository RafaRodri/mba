<?php

use Illuminate\Http\Request;

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

/**
 * Especificar controllers RESTful que vão lidar com o HTTP para os recursos
 */
Route::post('auth/login', 'Api\\AuthController@login');

Route::group(['middleware' => ['apiJwt']], function(){
    Route::post('auth/logout', 'Api\\AuthController@logout');

    Route::apiResource('apps', 'Api\\AppsController');
    Route::apiResource('users', 'Api\\UsersController');
    Route::apiResource('profiles', 'Api\\ProfilesController');
});
