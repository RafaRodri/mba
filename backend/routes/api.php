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
// authentication
Route::post('auth/login', array('middleware' => 'cors', 'uses' => 'Api\\AuthController@login'));

Route::group(['middleware' => ['cors', 'apiJwt']], function () {
    // logout
    Route::post('auth/logout', 'Api\\AuthController@logout');

    // resources apps
    Route::apiResource('apps', 'Api\\AppsController');
    // resources profiles
    Route::apiResource('profiles', 'Api\\ProfilesController');
    // resources users
    Route::apiResource('users', 'Api\\UsersController')->except(['store']);;
});

// user create (not authentication)
Route::post('users', array('middleware' => 'cors', 'uses' => 'Api\\UsersController@store'));
