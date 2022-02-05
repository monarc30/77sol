3

2

0

meherulsust
meherulsust
Posted on 3 de dez. de 2021 • Updated on 6 de dez. de 2021

How to build a JWT Authenticated API with Lumen (8.3.1)
Image description

Lumen is a the stunningly fast micro-framework by Laravel built to deliver microservices and blazing fast APIs.

In this tutorial, i would like to show you how to build a JWT Authenticated API with Lumen 8.

Let's get started!

Server Requirements

PHP >= 7.3
OpenSSL PHP Extension
PDO PHP Extension
Mbstring PHP Extension
Installation

Install Lumen via composer
composer create-project --prefer-dist laravel/lumen blog-api
Add config floder to the root directory and add auth.php file to the config folder, config/auth.php and add the code below into the auth.php file:
<?php

return [
    'defaults' => [
        'guard' => 'api',
        'passwords' => 'users',
    ],

    'guards' => [
        'api' => [
            'driver' => 'jwt',
            'provider' => 'users',
        ],
    ],

    'providers' => [
        'users' => [
            'driver' => 'eloquent',
            'model' => \App\Models\User::class
        ]
    ]
];
Install jwt-auth via composer
composer require tymon/jwt-auth
Bootstrap file changes.

Add the following snippet to the bootstrap/app.php file under the root directory as follows:
// Uncomment this line

$app->withFacades();

$app->withEloquent();

Then uncomment the auth middleware 

$app->routeMiddleware([
    'auth' => App\Http\Middleware\Authenticate::class,
]);

$app->register(App\Providers\AuthServiceProvider::class);

// Add this line in the same file:

$app->register(Tymon\JWTAuth\Providers\LumenServiceProvider::class);
Generate secret key

To generate a key for you:
php artisan jwt:secret
This will update your .env file with something like

JWT_SECRET=secret_jwt_string_key

It is the key that will be used to sign your tokens

Database Connection

Inside the .env file.
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=db_name
DB_USERNAME=root
DB_PASSWORD=
Create Migration

Run this for user table migration below
php artisan make:migration create_users_table
And replace it with the below code at

database\migrations*_create_users_table.php
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('email')->unique();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password');
            $table->rememberToken();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('users');
    }
}




Migrate your database
$ php artisan migrate
Create database seeder for a user by runing:
php artisan make:seeder UserTableSeeder
And replace it with the below code at

database\seeders\UserTableSeeder.php
<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;


class UserTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $user = User::create([
            'name' => 'Md.Meherul Islam', 
            'email' => 'meherul@gmail.com',
            'password' => Hash::make('12345678')
        ]);
    }
}
Then run the fllowing command to insert data into your database
php artisan db:seed --class=UserTableSeeder
Now create a files AuthController.php into

app\Http\Controllers\AuthController.php
with the below one
<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use  App\Models\User;

class AuthController extends Controller
{


    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['login', 'refresh', 'logout']]);
    }
    /**
     * Get a JWT via given credentials.
     *
     * @param  Request  $request
     * @return Response
     */
    public function login(Request $request)
    {

        $this->validate($request, [
            'email' => 'required|string',
            'password' => 'required|string',
        ]);

        $credentials = $request->only(['email', 'password']);

        if (! $token = Auth::attempt($credentials)) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        return $this->respondWithToken($token);
    }

     /**
     * Get the authenticated User.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function me()
    {
        return response()->json(auth()->user());
    }

    /**
     * Log the user out (Invalidate the token).
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout()
    {
        auth()->logout();

        return response()->json(['message' => 'Successfully logged out']);
    }

    /**
     * Refresh a token.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function refresh()
    {
        return $this->respondWithToken(auth()->refresh());
    }

    /**
     * Get the token array structure.
     *
     * @param  string $token
     *
     * @return \Illuminate\Http\JsonResponse
     */
    protected function respondWithToken($token)
    {
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'user' => auth()->user(),
            'expires_in' => auth()->factory()->getTTL() * 60 * 24
        ]);
    }
}
Now replace User Model code into app\Models\User.php with below code.
<?php

namespace App\Models;

use Illuminate\Auth\Authenticatable;
use Laravel\Lumen\Auth\Authorizable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Contracts\Auth\Authenticatable as AuthenticatableContract;
use Illuminate\Contracts\Auth\Access\Authorizable as AuthorizableContract;

//this is new
use Tymon\JWTAuth\Contracts\JWTSubject;

class User extends Model implements AuthenticatableContract, AuthorizableContract, JWTSubject 
{
    use Authenticatable, Authorizable;

    /**
     * Get the identifier that will be stored in the subject claim of the JWT.
     *
     * @return mixed
     */
    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    /**
     * Return a key value array, containing any custom claims to be added to the JWT.
     *
     * @return array
     */
    public function getJWTCustomClaims()
    {
        return [];
    }
}
Change route files into the routes\web.php with the code below :
<?php

/** @var \Laravel\Lumen\Routing\Router $router */

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It is a breeze. Simply tell Lumen the URIs it should respond to
| and give it the Closure to call when that URI is requested.
|
*/




$router->get('/', function () use ($router) {
    echo "<center> Welcome </center>";
});

$router->get('/version', function () use ($router) {
    return $router->app->version();
});

Route::group([

    'prefix' => 'api'

], function ($router) {
    Route::post('login', 'AuthController@login');
    Route::post('logout', 'AuthController@logout');
    Route::post('refresh', 'AuthController@refresh');
    Route::post('user-profile', 'AuthController@me');

});




Test Lumen JWT Authentication API with Postman

Now for built-in PHP development server:
php -S localhost:8000 -t public

We have created a secure REST API using JWT Authentication. To make the testing process easy and subtle, we will rely on Postman.

Authentication APIs for Login, User Profile, Token Refresh and Logout.

Method Endpoint at post man

POST localhost:8000/api/login
GET localhost:8000/api/user-profile
POST localhost:8000/api/refresh
POST localhost:8000/api//logout
Discussion (1)
Subscribe
pic
Add to the discussion
 
marcmsk profile image
marcm
•
Jan 12

GET localhost:8000/api/user-profile in the last list is not correct right?
It should be POST as for other routes.


Like
Reply
Code of Conduct • Report abuse
Read next
miss_stella_j profile image
The Next 100X Gem is here, GAMEIN Token by GameInfinity
Stella Johns - Feb 5

abdeldjalilhachimi profile image
How to use absolute Imports using React with Ts and Vite
Abdeldjalil Hachimi - Feb 4

mattiethomass profile image
Devfee disconnected and stopped
mattiethomass - Feb 4

developerbishwas profile image
$100 worth contest: Ultra Creator Contest
New Linux Helper - Feb 4


meherulsust
Follow
I am a PHP developer.I am developing Web application using PHP,MySql,Ajax,JavaScript,HTML Codeiginiter,Laravel and React js.
LOCATION
Bangladesh
WORK
PHP Developer at Vivasoft Ltd
JOINED
23 de jan. de 2020
More from meherulsust
System Design in Software Development
<?php

namespace App\Models;

use Illuminate\Auth\Authenticatable;
use Laravel\Lumen\Auth\Authorizable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Contracts\Auth\Authenticatable as AuthenticatableContract;
use Illuminate\Contracts\Auth\Access\Authorizable as AuthorizableContract;

//this is new
use Tymon\JWTAuth\Contracts\JWTSubject;

class User extends Model implements AuthenticatableContract, AuthorizableContract, JWTSubject 
{
    use Authenticatable, Authorizable;

    /**
     * Get the identifier that will be stored in the subject claim of the JWT.
     *
     * @return mixed
     */
    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    /**
     * Return a key value array, containing any custom claims to be added to the JWT.
     *
     * @return array
     */
    public function getJWTCustomClaims()
    {
        return [];
    }
}