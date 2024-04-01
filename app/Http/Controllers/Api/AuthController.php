<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\SignupRequest;
use App\Models\User;
use Http\Env\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function login(LoginRequest $request)
    {
        $credentials =$request->validated();
        if(!Auth::attempt($credentials)) {
            return response([
                'message' => 'Invalid credentials'
            ],422);
        }
        /** @var User $user */
        $user =  Auth::user();
        $token= $user->createToken('main')->plainTextToken;
        return response(compact('user', 'token'));
    }


    public function signup(SignupRequest $request)
    {
        $data = $request->validated();
        $user= User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => bcrypt($data['password']),
        ]);

        $token = $user->createToken('main')->plainTextToken;

        return response(compact('user', 'token'));
    }


    public function logout(Request $request)
    {
        /** @var User $user  */
        $user = $request->user();
        $user->currentAccessToken()->delete(); // This line should be corrected
        return response('',204);
    }
}
