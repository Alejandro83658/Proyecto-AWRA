<?php


namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;

class Adoption extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'animal_id',
        'adoption_date',
        'returned',
        'return_date',
        'reason',
        'status', // Si esta aceptado, pendiente o rechazado
        'notes',
    ];

    // Relación con el usuario
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // Relación con el animal
    public function animal()
    {
        return $this->belongsTo(Animal::class);
    }

    // Scope para obtener adopciones activas
    public function scopeActive($query)
    {
        return $query->where('active', true);
    }

    // Accessor para adoption_date
    public function getAdoptionDateAttribute($value)
    {
        return $value ? Carbon::parse($value)->format('d/m/Y') : null;
    }

    // Accessor para return_date
    public function getReturnDateAttribute($value)
    {
        return $value ? Carbon::parse($value)->format('d/m/Y') : null;
    }
}
