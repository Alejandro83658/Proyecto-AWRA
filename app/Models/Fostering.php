<?php


namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;

class Fostering extends Model
{
    use HasFactory;

    protected $fillable = [
        'animal_id',
        'user_id',
        'start_date',
        'end_date',
        'status', // Si esta aceptado, pendiente o rechazado
        'notes',
    ];

    // Relación con el animal
    public function animal()
    {
        return $this->belongsTo(Animal::class);
    }

    // Relación con el usuario
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // Accessor para start_date en formato d/m/Y
    public function getStartDateAttribute($value)
    {
        return $value ? \Carbon\Carbon::parse($value)->format('d/m/Y') : null;
    }

    // Accessor para end_date en formato d/m/Y
    public function getEndDateAttribute($value)
    {
        return $value ? \Carbon\Carbon::parse($value)->format('d/m/Y') : null;
    }
}
