<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\payement;
use App\Http\Requests\StorepayementRequest;
use App\Http\Requests\UpdatepayementRequest;
use App\Http\Resources\PayemmentResource;
use Illuminate\Http\Request;
use App\Models\Cours;
use Stripe\PaymentIntent;
use Stripe\Stripe;

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
        $payement = new payement();
        $payement->idCour = $validatedData['idCour'];
        $payement->Card_Number = $validatedData['Card_Number'];
        $payement->dateN = $validatedData['dateN'];
        $payement->name_card = $validatedData['name_card'];
        $payement->email = $validatedData['email'];
        $payement->cvv_code = $validatedData['cvv_code'];
     
        $payement->save();

       

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

  public function createPaymentIntent(Request $request)
    {
        $course = Cours::findOrFail($request->course_id);

     
        Stripe::setApiKey(config('services.stripe.secret'));

        
        $paymentIntent = PaymentIntent::create([
            'amount' => $course->prix * 100, 
            'currency' => 'usd',
            'description' => 'Purchase of course: ' . $course->titre,
            'metadata' => [
                'course_id' => $course->idCours,
                'user_id'   => $request->user()->id ?? null,
            ],
        ]);

        return response()->json([
            'clientSecret' => $paymentIntent->client_secret,
        ]);
    }

    public function handleSuccess(Request $request)
    {
        $payment = Payement::create([
            'user_id'        => auth()->id(),
            'course_id'      => $request->course_id,
            'amount'         => $request->amount,
            'payment_intent' => $request->payment_intent,
            'status'         => 'completed',
        ]);

       
        if (auth()->check()) {
            auth()->user()->courses()->attach($request->course_id);
        }

        return response()->json(['success' => true, 'payment' => $payment]);
    }


  public function checkCourseAccess(Request $request, $courseId)
    {
        $user = auth()->user();
        
        if (!$user) {
            return response()->json(['hasAccess' => false], 401);
        }

        $course = Cours::findOrFail($courseId);
    
        $isFree = !$course->prix || $course->prix === "0" || $course->prix == 0;
        
        if ($isFree) {
            return response()->json(['hasAccess' => true, 'isFree' => true]);
        }

        $hasAccess = $user->courses()->where('course_id', $courseId)->exists();
        
        return response()->json([
            'hasAccess' => $hasAccess,
            'isFree' => false
        ]);
    }
}

