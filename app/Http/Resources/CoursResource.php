<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class CoursResource extends JsonResource
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
        return [
            'idCours' => $this->idCours,
            'titre' => $this->titre,
            'description' => $this->description,
            'image' => $this->image, 'enseignant' => $this->enseignant,
            'prix' => $this->prix,
        ];
    }
}
