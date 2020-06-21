<?php

namespace App\Http\Controllers;

use App\Profile;
use Illuminate\Http\Request;

class ProfilesController extends Controller
{
    public function index()
    {
        $profiles = Profile::all();
        return response()->json($profiles);
    }
    
    public function show($id)
    {
        $profile = Profile::find($id);

        if(!$profile) {
            return response()->json([
                'message' => 'Record not found',
            ], 404);
        }

        return response()->json($profile);
    }
    
    public function store(Request $request)
    {
        $profile = new Profile();
        $profile->fill($request->all());
        $profile->save();

        return response()->json($profile, 201);
    }

    public function update(Request $request, $id)
    {
        $profile = Profile::find($id);

        if(!$profile) {
            return response()->json([
                'message' => 'Record not found',
            ], 404);
        }

        $profile->fill($request->all());
        $profile->save();

        return response()->json($profile);
    }

    public function destroy($id)
    {
        $profile = Profile::find($id);

        if(!$profile) {
            return response()->json([
                'message' => 'Record not found',
            ], 404);
        }

        $profile->delete();
    }
}
