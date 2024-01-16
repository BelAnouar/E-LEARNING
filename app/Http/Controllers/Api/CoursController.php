<?php

namespace App\Http\Controllers\Api;

use App\Models\Cours;
use App\Http\Controllers\Controller;
use App\Http\Resources\CoursResource;

use App\Http\Requests\StoreCoursRequest;
use App\Http\Requests\UpdateCoursRequest;


class CoursController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return CoursResource::collection(Cours::all());
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StoreCoursRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreCoursRequest $request)
    {

        $data = $request->validated();


        $imagePath = $request->file('image')->store('public/images');
        $path = $imagePath;
        $newPath = str_replace("public", "storage", $path);

       
   

        $cour = Cours::create([
            'titre' => $data['titre'],
            'description' => $data['description'],
            "image" => $newPath, 'enseignant' => $data["enseignant"],
            'prix' => $data['prix']
        ]);

        return response(new CoursResource($cour));
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Cours  $cours
     * @return \Illuminate\Http\Response
     */
    public function show($idCours)
    {
        $cours = Cours::findOrFail($idCours);
        return new CoursResource($cours);
    }


    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateCoursRequest  $request
     * @param  \App\Models\Cours  $cours
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateCoursRequest $request, Cours $cours)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Cours  $cours
     * @return \Illuminate\Http\Response
     */
    public function destroy(Cours $cours)
    {
        //
    }
}
