<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class UsersController extends Controller
{
    public function index()
    {
        // GET
        // "Eager loading" para associar com as tabelas profiles e apps
        $users = User::with('profile','apps')->get();
        return response()->json($users);
    }
    
    public function show($id)
    {    
        // GET
        // Busca por ID, associando com a tabela profile
        $user = User::with('profile')->find($id);

        if(!$user) {
            // Caso não encontre por ID, busca por CPF
            $user = User::with('profile')->where('cpf', $id)->first();

            // Caso ainda não encontre registro, retorna status 404
            if(!$user) {
                return response()->json([
                    'message' => 'Record not found',
                ], 404);
            }
        }

        return response()->json($user);
    } 
    
    public function store(Request $request)
    {
        // POST
        // Cadastra novo usuário
        $user = new User();
        $user->fill($request->all());
        $user->save();

        // Retorna com status 201
        return response()->json($user, 201);
    }

    public function update(Request $request, $id)
    {
        // PUT
        // Busca usuário por ID
        $user = User::find($id);

        // Caso não encontre registro, retorna status 404
        if(!$user) {
            return response()->json([
                'message' => 'Record not found',
            ], 404);
        }

        // Atualiza o usuário
        $user->fill($request->all());
        $user->save();

        return response()->json($user);
    }

    public function destroy($id)
    {
        // DELETE
        // Busca usuário por ID
        $user = User::find($id);

        // Caso não encontre registro, retorna status 404
        if(!$user) {
            return response()->json([
                'message' => 'Record not found',
            ], 404);
        }

        // Deleta o usuário
        $user->delete();
    }
}
