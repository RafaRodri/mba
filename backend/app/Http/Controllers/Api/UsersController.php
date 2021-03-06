<?php

namespace App\Http\Controllers\Api;

use App\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use \Exception;

class UsersController extends Controller
{
    public function index()
    {
        // GET
        try {
            // "Eager loading" para associar com as tabelas profiles e apps
            $users = User::with('profile', 'apps')->get();

            // Resposta com status 200
            return response()->json($users, 200);
        } catch (Exception $e) {
            return response()->json([
                'code' => $e->getCode(),
                'message' => $e->getMessage()
            ], 400);
        }
    }

    public function show($id)
    {
        // GET
        try {
            // Busca por CPF, associando com as tabelas profiles e apps
            $user = User::with('profile', 'apps')->where('cpf', $id)->first();

            if (!$user) {
                // Caso não encontre por CPF, busca por ID
                $user = User::with('profile', 'apps')->find($id);

                // Caso não encontre registro, retorna status 404
                if (!$user) {
                    return response()->json([
                        'message' => 'Record not found',
                    ], 404);
                }
            }

            // Resposta com status 200
            return response()->json($user, 200);
        } catch (Exception $e) {
            return response()->json([
                'code' => $e->getCode(),
                'message' => $e->getMessage()
            ], 400);
        }
    }

    public function store(Request $request)
    {
        // POST
        try {
            // Cadastra novo usuário
            $user = new User();
            $data = $request->all();
            $data['password'] = bcrypt($data['password']);
            $user->fill($data);
            $user->save();

            // Resposta com status 201
            return response()->json($user, 201);
        } catch (Exception $e) {
            return response()->json([
                'code' => $e->getCode(),
                'message' => $e->getMessage()
            ], 400);
        }
    }

    public function update(Request $request, $id)
    {
        // PUT
        try {
            // Busca usuário por ID
            $user = User::find($id);
            $data = $request->all();

            // Caso não encontre registro, retorna status 404
            if (!$user) {
                return response()->json([
                    'message' => 'Record not found',
                ], 404);
            }

            // Recebe os aplicativos permitidos a este usuário
            if (array_key_exists('apps', $request->all())) {
                $apps = $request->all()['apps'];
                // Remove todas as relações e as configura novamente
                $user->apps()->sync($apps);
            }

            // Criptografa senha, caso esteja sendo enviada e diferente de null
            if (array_key_exists('password', $data)) {
                $data['password'] = bcrypt($data['password']);
            }

            // Atualiza o usuário
            $user->fill($data);
            $user->save();

            // Resposta com status 200
            return response()->json($user, 200);
        } catch (Exception $e) {
            return response()->json([
                'code' => $e->getCode(),
                'message' => $e->getMessage()
            ], 400);
        }
    }

    public function destroy($id)
    {
        // DELETE
        try {
            // Busca usuário por ID
            $user = User::find($id);

            // Caso não encontre registro, retorna status 404
            if (!$user) {
                return response()->json([
                    'message' => 'Record not found',
                ], 404);
            }

            // Deleta o usuário
            $user->delete();

            // Resposta com status 202
            return response()->json(['id' => $id], 202);
        } catch (Exception $e) {
            return response()->json([
                'code' => $e->getCode(),
                'message' => $e->getMessage()
            ], 400);
        }
    }
}
