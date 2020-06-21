<?php

namespace App\Http\Controllers;

use App\Profile;
use Illuminate\Http\Request;

class ProfilesController extends Controller
{
    public function index()
    {
        // GET
        // Busca todos os registros
        $profiles = Profile::all();
        return response()->json($profiles);
    }
    
    public function show($id)
    {
        // GET
        // Busca por ID
        $profile = Profile::find($id);

        // Caso não encontre registro, retorna status 404
        if(!$profile) {
            return response()->json([
                'message' => 'Record not found',
            ], 404);
        }

        return response()->json($profile);
    }
    
    public function store(Request $request)
    {
        // POST
        // Cadastra novo perfil
        $profile = new Profile();
        $profile->fill($request->all());
        $profile->save();

        // Retorna com status 201
        return response()->json($profile, 201);
    }

    public function update(Request $request, $id)
    {
        // PUT
        // Busca perfil por ID
        $profile = Profile::find($id);

        // Caso não encontre registro, retorna status 404
        if(!$profile) {
            return response()->json([
                'message' => 'Record not found',
            ], 404);
        }

        // Atualiza o perfil
        $profile->fill($request->all());
        $profile->save();

        return response()->json($profile);
    }

    public function destroy($id)
    {
        // DELETE
        // Busca perfil por ID
        $profile = Profile::find($id);

        // Caso não encontre registro, retorna status 404
        if(!$profile) {
            return response()->json([
                'message' => 'Record not found',
            ], 404);
        }

        // Deleta o perfil
        $profile->delete();
    }
}
