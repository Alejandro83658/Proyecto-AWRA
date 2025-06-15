<?php


namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;

class Sponsorship extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'animal_id',
        'start_date',
        'end_date',
        'amount_eur',
        'payment_method', // Método de pago
        'is_paid',   // Indica si el pago ha sido realizado
        'status', // si esta aceptado, pendiente o rechazado
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
