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
        Schema::create('users_profile', function (Blueprint $table) {
            $table->id(); // id SERIAL PRIMARY KEY
            $table->foreignId('user_id') // user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE
                ->constrained('users')
                ->onDelete('cascade');
            $table->string('first_name')->nullable(); // Nombre opcional
            $table->string('last_name')->nullable(); // Apellido opcional
            $table->string('dni')->unique()->nullable(); // DNI opcional
            $table->string('phone', 20)->nullable(); // Teléfono opcional
            $table->text('address')->nullable(); // Dirección opcional
            $table->text('city')->nullable(); // Ciudad opcional
            $table->text('province')->nullable(); // Provincia opcional
            $table->string('profile_picture')->nullable(); // Foto de perfil opcional
            $table->date('birth_date')->nullable(); // Fecha de nacimiento opcional
            $table->text('comments')->nullable(); // Comentarios opcionales
            $table->timestamps(); // Fecha de creación y última actualización
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users_profile');
    }
};