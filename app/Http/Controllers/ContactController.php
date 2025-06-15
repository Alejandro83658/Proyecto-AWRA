<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class ContactController extends Controller
{
    public function store(Request $request)
    {
        $data = $request->validate([
            'nombre' => 'required|string',
            'email' => 'required|email',
            'asunto' => 'required|string',
            'otroAsunto' => 'nullable|string',
            'mensaje' => 'required|string',
        ]);

        $asunto = $data['asunto'] === 'otros' ? $data['otroAsunto'] : $data['asunto'];

        Mail::send([], [], function ($message) use ($data, $asunto) {
            $message->to('contacto@awra.com')
                ->subject('Contacto web: ' . $asunto)
                ->text(
                    "Nombre: {$data['nombre']}\nEmail: {$data['email']}\nAsunto: {$asunto}\n\nMensaje:\n{$data['mensaje']}"
                );
        });

        return redirect()->back()->with('success', '¡Mensaje enviado correctamente!');
    }
}
