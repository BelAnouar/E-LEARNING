<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateCoursRequest extends FormRequest
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
                'titre'=>'required|string',
                'description'=>'required|string',
                'image'=>'required|image|mimes:jpg,png,jpeg|max:5048',"enseignant"=>'required|string',
                'prix' =>'required|string',
            ];
       
    }
}
