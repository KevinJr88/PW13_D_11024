<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Favourites;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Contents;
use App\Models\User;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;


class FavouritesController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $idUser = Auth::user()->id;
        $favourites = Favourites::orderBy('favourites.id', 'asc')
        ->where('favourites.id_user',  $idUser) 
        ->join('contents', 'favourites.id_content', '=', 'contents.id') 
        ->select('favourites.id', 'contents.title', 'contents.thumbnail', 'contents.description' )
        ->get();

        return response([
            'message' => 'All Favourites  Retrieved',
            'data' => $favourites
        ], 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $storeData = $request->all();

        $validate = Validator::make($storeData,[
            'id_content' => 'required',
        ]);
        if ($validate->fails()) {
            return response(['message'=> $validate->errors()],400);
        }
        
        $favourites = Favourites::where('id_content', $storeData['id_content'])->first();
        
        if ($favourites !== null) {
            return response([
                'message' => 'Already in your favourite list'
            ], 404);
        }
        
        $idUser = Auth::user()->id;
        $user = User::find($idUser);
        if(is_null($user)){
            return response([
                'message' => 'User Not Found'
            ],404);
        }

        $storeData['id_user'] = $user->id;

        $favourites = Favourites::create($storeData);
        return response([
            'message' => ' Favourites Added Successfully',
            'data' => $favourites,
        ],200);
    }  


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $favourites = Favourites::where('id', $id)->first();

        if($favourites == null ){
            return response([
                'message' => 'Favourites Not Found',
                'data' => null
            ],404);
        }

        if($favourites ->delete()){
            return response([
                'message' => 'Favourites  Deleted Successfully',
                'data' => $favourites ,
            ],200);
        }

        return response([
            'message' => 'Delete Content Failed',
            'data' => null,
        ],400);
    }
}