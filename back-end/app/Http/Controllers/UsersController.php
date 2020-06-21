<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class UsersController extends Controller
{
    public function index()
    {
        //$users = User::all();
        $users = User::with('profile')->get();
        return response()->json($users);
    }
    
    public function show($cpf)
    {    
        $user = User::with('profile')->where('cpf', $cpf)->first();

        if(!$user) {
            return response()->json([
                'message' => 'Record not found',
            ], 404);
        }

        return response()->json($user);
    } 
    
    public function store(Request $request)
    {
        $user = new User();
        $user->fill($request->all());
        $user->save();

        return response()->json($user, 201);
    }

    public function update(Request $request, $cpf)
    {
        $user = User::with('profile')->where('cpf', $cpf);

        if(!$user) {
            return response()->json([
                'message' => 'Record not found',
            ], 404);
        }

        $user->update($request->all());

        return response()->json($user);
    }

    public function destroy($cpf)
    {
        //$user = User::find($id);
        $user = User::with('profile')->where('cpf', $cpf)->first();

        if(!$user) {
            return response()->json([
                'message' => 'Record not found',
            ], 404);
        }

        $user->delete();
    }
}
