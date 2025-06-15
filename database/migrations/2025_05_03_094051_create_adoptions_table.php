<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::create('adoptions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->foreignId('animal_id')->constrained()->onDelete('cascade');
            $table->timestamp('adoption_date');  // Fecha de adopción
            $table->boolean('returned')->default(false);  // Si fue devuelto, valor por defecto 'false'
            $table->timestamp('return_date')->nullable();  // Fecha de retorno (puede ser nula hasta que el animal sea devuelto)
            $table->string('reason')->nullable();  // Razón de la devolución (opcional)
            $table->enum('status', ['pendiente', 'en_estudio', 'aceptado', 'rechazado'])->default('pendiente'); // Estado de la adopción
            $table->text('notes')->nullable();  // Notas adicionales (opcional)
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('adoptions');
    }
};