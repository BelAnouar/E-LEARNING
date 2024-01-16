<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Weeks;
use App\Http\Requests\StoreWeeksRequest;
use App\Http\Requests\UpdateWeeksRequest;
use App\Http\Resources\WeeksResource;
use Illuminate\Http\Request;

class WeeksController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $weeks = Weeks::latest()->filter(request(['idCour']))->get();
        return WeeksResource::collection($weeks);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StoreWeeksRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreWeeksRequest $request)
    {
        $validatedData = $request->validated();

        // Create a new instance of the Weeks model with the validated data
        $week = new Weeks();
        $week->idCour = $validatedData['idCour'];
        $week->titre = $validatedData['titre'];
        $week->description = $validatedData['description'];

        // Save the new week to the database
        $week->save();

        // Implement any additional logic after storing the week

        return response()->json($week, 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Weeks  $weeks
     * @return \Illuminate\Http\Response
     */
    public function show($idCour)
    {
        $cours = Weeks::where('idCour', $idCour)->get();
        return new WeeksResource($cours);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateWeeksRequest  $request
     * @param  \App\Models\Weeks  $weeks
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $week = json_decode($request->getContent(), true)[$id];

        $updatedRows = Weeks::where('idweek', $id)->update([
            'titre' => $week['titre'],
            'description' => $week['description']
        ]);

        $weeks = Weeks::where('idweek', $id)->first();

        return new WeeksResource($weeks);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Weeks  $weeks
     * @return \Illuminate\Http\Response
     */
    public function destroy(Weeks $weeks)
    {
        //
    }
}
