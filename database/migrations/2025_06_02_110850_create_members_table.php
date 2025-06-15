<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
         Schema::create('members', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id')->unique();
            $table->string('name'); // Nombre del socio
            $table->string('email');
            $table->string('phone', 20)->nullable();
            $table->string('dni');
            $table->date('birth_date')->nullable(); // Fecha de nacimiento del socio (opcional) 
            $table->text('address')->nullable(); // Dirección opcional
            $table->text('city')->nullable(); // Ciudad opcional
            $table->text('province')->nullable(); // Provincia opcional
            $table->decimal('amount', 8, 2); // Cuota o cantidad
            $table->enum('frequency', ['mensual', 'trimestral', 'anual'])->default('mensual'); // Frecuencia de pago
            $table->enum('payment_method', ['transferencia', 'tarjeta', 'bizum'])->default('transferencia'); // Método de pago 
            $table->enum('status', ['pendiente', 'aceptado', 'rechazado'])->default('pendiente'); // Estado de la solicitud
            $table->date('start_date')->default(now()); // Fecha de inicio de la membresía
            $table->date('end_date')->nullable(); // Fecha de finalización de la membresía (opcional)
                      
            $table->text('comments')->nullable();
            $table->timestamps();

            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('members');
    }
};
