<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class PayemmentResource extends JsonResource
{
    public static $wrap = false;
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
       return [ 'idPayement'=> $this->idPayement,
            "Card_Number" => $this->Card_Number,
        "dateN" => $this->dateN,
        "name_card"  => $this->name_card,
        "email"  => $this->email,
        "cvv_code"  => $this->cvv_code,
        'idCour'  => $this->idCour];
    }
}
