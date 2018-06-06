<?php


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

Route::name('api.')->namespace('Api')->group(function () {
    // Unprotected routes
    Route::namespace('Auth')->group(function () {
        Route::post('signin', 'SignInController@signIn')->name('signin');
        Route::post('register', 'RegisterController@Register')->name('register');
    });

    // Protected routes
    Route::middleware('auth:api')->group(function () {
         Route::get('me', 'Auth\MeController@Me')->name('me');

    });
});
