<?php


namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;

class UserProfile extends Model
{
    /** @use HasFactory<\Database\Factories\UserProfileFactory> */
    use HasFactory;

    /**
     * La tabla asociada al modelo.
     *
     * @var string
     */
    protected $table = 'users_profile';

    /**
     * Los atributos que se pueden asignar masivamente.
     *
     * @var array<string>
     */
    protected $fillable = [
        'user_id',
        'first_name',
        'last_name',
        'dni',
        'phone',
        'address',
        'city',
        'province',
        'profile_picture',
        'birth_date',
        'comments',
    ];

    /**
     * Relación con el modelo User.
     * Un perfil pertenece a un usuario.
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // Accessor para birth_date en formato d/m/Y
    public function getBirthDateAttribute($value)
    {
        return $value ? \Carbon\Carbon::parse($value)->format('d/m/Y') : null;
    }
}
