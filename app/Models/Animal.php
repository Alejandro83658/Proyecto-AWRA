<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;

class Animal extends Model
{
    use HasFactory;

    // Los campos que pueden ser asignados masivamente
    protected $fillable = [
        'name',
        'species',
        'breed',
        'sex',
        'birth_date',
        'arrival_date',
        'size',
        'weight_kg',
        'chip_number',
        'status',
        'special_type',
        'deceased_date',
        'description',
        'health_notes',
        'is_fosterable',
        'is_fostered',
    ];

    // aqui que se utilicen tipos de datos específicos
    protected $casts = [
        'is_fosterable' => 'boolean',
        'is_fostered' => 'boolean',
        'birth_date' => 'date',
        'arrival_date' => 'date',
        'deceased_date' => 'date',
        'weight_kg' => 'float',
    ];

    protected $appends = ['age'];

    // Relaciones
    public function images()
    {
        return $this->hasMany(AnimalImage::class);
    }

    public function adoptions()
    {
        return $this->hasMany(Adoption::class);
    }

    public function fosterings()
    {
        return $this->hasMany(Fostering::class);
    }

    public function activeFostering()
    {
        return $this->hasOne(Fostering::class)->where('status', 'pendiente');
    }

    public function sponsorships()
    {
        return $this->hasMany(Sponsorship::class);
    }

    public function volunteers()
    {
        return $this->hasMany(Volunteer::class);
    }

    // Accessors para fechas en formato d/m/Y
    public function getBirthDateAttribute($value)
    {
        return $value ? Carbon::parse($value)->format('d/m/Y') : null;
    }

    public function getArrivalDateAttribute($value)
    {
        return $value ? Carbon::parse($value)->format('d/m/Y') : null;
    }

    public function getDeceasedDateAttribute($value)
    {
        return $value ? Carbon::parse($value)->format('d/m/Y') : null;
    }

    /**
     * Accesor para obtener la edad calculada a partir de birth_date.
     * Si el animal está fallecido, calcula hasta la fecha de fallecimiento.
     */
    public function getAgeAttribute()
    {
        $birthDate = $this->getRawOriginal('birth_date');
        if (!$birthDate) {
            return null;
        }

        $deceasedDate = $this->getRawOriginal('deceased_date');
        $endDate = $deceasedDate ? Carbon::parse($deceasedDate) : Carbon::now();

        return (int) Carbon::parse($birthDate)->diffInYears($endDate);
    }
}
