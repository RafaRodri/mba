<?php

namespace App\Http\Controllers\Api;

use App\Profile;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use \Exception;

class ProfilesController extends Controller
{
    public function index()
    {
        // GET
        try {
            // Busca todos os registros
            $profiles = Profile::all();

            // Resposta com status 200
            return response()->json($profiles, 200);
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
            // Busca por ID
            $profile = Profile::find($id);

            // Caso não encontre registro, retorna status 404
            if (!$profile) {
                return response()->json([
                    'message' => 'Record not found',
                ], 404);
            }

            // Resposta com status 200
            return response()->json($profile, 200);
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
            // Cadastra novo perfil
            $profile = new Profile();
            $profile->fill($request->all());
            $profile->save();

            // Retorna com status 201
            return response()->json($profile, 201);
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
            // Busca perfil por ID
            $profile = Profile::find($id);

            // Caso não encontre registro, retorna status 404
            if (!$profile) {
                return response()->json([
                    'message' => 'Record not found',
                ], 404);
            }

            // Atualiza o perfil
            $profile->fill($request->all());
            $profile->save();

            // Resposta com status 200
            return response()->json($profile, 200);
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
            // Busca perfil por ID
            $profile = Profile::find($id);

            // Caso não encontre registro, retorna status 404
            if (!$profile) {
                return response()->json([
                    'message' => 'Record not found',
                ], 404);
            }

            // Deleta o perfil
            $profile->delete();

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
