<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\payement;
use App\Http\Requests\StorepayementRequest;
use App\Http\Requests\UpdatepayementRequest;
use App\Http\Resources\PayemmentResource;

class PayementController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return  PayemmentResource::collection(payement::all());
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StorepayementRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StorepayementRequest $request)
    {
        $validatedData = $request->validated();

        // Create a new instance of the Weeks model with the validated data
        $payement = new payement();
        $payement->idCour = $validatedData['idCour'];
        $payement->Card_Number = $validatedData['Card_Number'];
        $payement->dateN = $validatedData['dateN'];
        $payement->name_card = $validatedData['name_card'];
        $payement->email = $validatedData['email'];
        $payement->cvv_code = $validatedData['cvv_code'];
       
           
        // Save the new payement to the database
        $payement->save();

        // Implement any additional logic after storing the week

        return response()->json($payement, 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\payement  $payement
     * @return \Illuminate\Http\Response
     */
    public function show(payement $payement)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdatepayementRequest  $request
     * @param  \App\Models\payement  $payement
     * @return \Illuminate\Http\Response
     */
    public function update(UpdatepayementRequest $request, payement $payement)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\payement  $payement
     * @return \Illuminate\Http\Response
     */
    public function destroy(payement $payement)
    {
        //
    }
}
