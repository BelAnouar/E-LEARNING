<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StorepayementRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        
            return [
                'idCour' => 'required|exists:cours,idCours',
                "dateN" => 'required|date',
                "Card_Number"=> 'required|string',
                "name_card"=> 'required|string',
                 "email" => 'required|string',
                "cvv_code"=> 'required|string',
           
            ];
       
    }
}
