<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreFileRequest extends FormRequest
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
            'idWeek' => 'required|exists:weeks,idweek',
            'File' => 'required',
            'name' => 'required|string',
            'type' => 'required|string',
            'size' => 'required',
            'lastModified' => 'required',

        ];
    }
}
