<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
use App\Models\Adoption;

class ResguardoAdopcionNotification extends Notification
{
    use Queueable;

    public $adoption;

    public function __construct(Adoption $adoption)
    {
        $this->adoption = $adoption;
    }

    public function via($notifiable)
    {
        return ['mail'];
    }

    public function toMail($notifiable)
    {
        return (new MailMessage)
            ->subject('Solicitud de adopción recibida')
            ->greeting('¡Gracias por tu solicitud!')
            ->line('Hemos recibido tu solicitud de adopción para ' . $this->adoption->animal->name . '.')
            ->line('Nos comunicaremos contigo a la brevedad.')
            ->line('📧 contacto@awra.com')
            ->line('https://awra.com/contacto')
            ->action('Ir a AWRA', url('/'))
            ->line('Este correo es tu comprobante de la gestión realizada.')
            ->salutation("Saludos,\nEl equipo de AWRA\n2025 AWRA todos los derechos reservados");
    }
}
