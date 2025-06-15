<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Member extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'name',
        'email',
        'phone',
        'dni',
        'address',
        'city',
        'province',
        'amount',
        'frequency',
        'payment_method',
        'comments',
        'status', // Estado de la solicitud: pendiente, aceptada, rechazada
        'birth_date', // Fecha de nacimiento del socio (opcional)
    ];

    // Relación uno a uno con User
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
