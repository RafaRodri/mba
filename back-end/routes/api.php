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
Route::get('/', function () {
    return response()->json(['message' => 'MBA API', 'status' => 'Connected']);;
});

Route::resource('users', 'UsersController');
Route::resource('apps', 'AppsController');
Route::resource('profiles', 'ProfilesController');