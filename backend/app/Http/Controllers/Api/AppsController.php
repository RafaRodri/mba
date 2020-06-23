<?php

namespace App\Http\Controllers\Api;

use App\App;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class AppsController extends Controller
{
    public function index()
    {
        // GET
        // Busca todos os registros
        $apps = App::all();
        return response()->json($apps);
    }
    
    public function show($id)
    {
        // GET
        // Busca por ID
        $app = App::find($id);

        // Caso não encontre registro, retorna status 404
        if(!$app) {
            return response()->json([
                'message' => 'Record not found',
            ], 404);
        }

        return response()->json($app);
    }
    
    public function store(Request $request)
    {
        // POST
        // Cadastra novo aplicativo
        $app = new App();
        $app->fill($request->all());
        $app->save();

        // Retorna com status 201
        return response()->json($app, 201);
    }

    public function update(Request $request, $id)
    {
        // PUT
        // Busca aplicativo por ID
        $app = App::find($id);

        // Caso não encontre registro, retorna status 404
        if(!$app) {
            return response()->json([
                'message' => 'Record not found',
            ], 404);
        }

        // Atualiza o aplicativo
        $app->fill($request->all());
        $app->save();

        return response()->json($app);
    }

    public function destroy($id)
    {
        // DELETE
        // Busca aplicativo por ID
        $app = App::find($id);

        // Caso não encontre registro, retorna status 404
        if(!$app) {
            return response()->json([
                'message' => 'Record not found',
            ], 404);
        }

        // Deleta o aplicativo
        $app->delete();
    }
}
