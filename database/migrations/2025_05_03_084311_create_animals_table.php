<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('animals', function (Blueprint $table) {
            $table->id();
            $table->string('name'); // Nombre del animal
            $table->enum('species', ['perro', 'gato']); // Especie (perro, gato)
            $table->string('breed'); // Raza
            $table->enum('sex', ['Macho', 'Hembra']); // Sexo (Macho, Hembra)
            $table->date('birth_date')->nullable(); // Fecha de nacimiento
            $table->date('arrival_date'); // Fecha de ingreso al refugio
            $table->enum('size', ['Pequeño', 'Mediano', 'Grande']); // Tamaño
            $table->decimal('weight_kg', 5, 2)->nullable(); // Peso en kg
            $table->string('chip_number')->nullable(); // Nº de chip
            $table->enum('status', ['Disponible', 'Adoptado', 'Reservado', 'No disponible', 'Fallecido']); // Estado
            $table->enum('special_type', ['Ninguno', 'Urgente', 'Invisible'])->default('Ninguno'); // Tipo especial para destacar
            $table->date('deceased_date')->nullable(); // Fecha de fallecimiento
            $table->text('description')->nullable(); // Historia del animal
            $table->text('health_notes')->nullable(); // Notas de salud
            $table->boolean('is_fosterable')->default(false); // ¿Puede ser acogido?
            $table->boolean('is_fostered')->default(false); // ¿Está acogido actualmente?
            $table->timestamps(); // created_at, updated_at
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('animals');
    }
};
