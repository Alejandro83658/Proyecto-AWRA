<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AnimalImage extends Model
{
    use HasFactory;

    protected $fillable = [
        'animal_id',
        'path',
        'is_cover',
    ];

    // Relación con el modelo Animal (uno a muchos)
    public function animal()
    {
        return $this->belongsTo(Animal::class);
    }
}
