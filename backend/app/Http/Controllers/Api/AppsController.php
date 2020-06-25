<?php

namespace App\Http\Controllers\Api;

use App\App;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use \Exception;

class AppsController extends Controller
{
    public function index()
    {
        // GET
        try {
            // Busca todos os registros
            $apps = App::all();

            // Resposta com status 200
            return response()->json($apps, 200);
        } catch (Exception $e) {
            return response()->json([
                'code' => $e->getCode(),
                'message' => $e->getPrevious()->getMessage()
            ], 400);
        }
    }

    public function show($id)
    {
        // GET
        try {
            // Busca por ID
            $app = App::find($id);

            // Caso não encontre registro, retorna status 404
            if (!$app) {
                return response()->json([
                    'message' => 'Record not found',
                ], 404);
            }

            // Resposta com status 200
            return response()->json($app, 200);
        } catch (Exception $e) {
            return response()->json([
                'code' => $e->getCode(),
                'message' => $e->getPrevious()->getMessage()
            ], 400);
        }
    }

    public function store(Request $request)
    {
        // POST
        try {
            // Cadastra novo aplicativo
            $app = new App();
            $app->fill($request->all());
            $app->save();

            // Retorna com status 201
            return response()->json($app, 201);
        } catch (Exception $e) {
            return response()->json([
                'code' => $e->getCode(),
                'message' => $e->getPrevious()->getMessage()
            ], 400);
        }
    }

    public function update(Request $request, $id)
    {
        // PUT
        try {
            // Busca aplicativo por ID
            $app = App::find($id);

            // Caso não encontre registro, retorna status 404
            if (!$app) {
                return response()->json([
                    'message' => 'Record not found',
                ], 404);
            }

            // Atualiza o aplicativo
            $app->fill($request->all());
            $app->save();

            // Resposta com status 200
            return response()->json($app, 200);
        } catch (Exception $e) {
            return response()->json([
                'code' => $e->getCode(),
                'message' => $e->getPrevious()->getMessage()
            ], 400);
        }
    }

    public function destroy($id)
    {
        // DELETE
        try {
            // Busca aplicativo por ID
            $app = App::find($id);

            // Caso não encontre registro, retorna status 404
            if (!$app) {
                return response()->json([
                    'message' => 'Record not found',
                ], 404);
            }

            // Deleta o aplicativo
            $app->delete();

            // Resposta com status 202
            return response()->json(['id' => $id], 202);
        } catch (Exception $e) {
            return response()->json([
                'code' => $e->getCode(),
                'message' => $e->getPrevious()->getMessage()
            ], 400);
        }
    }
}
