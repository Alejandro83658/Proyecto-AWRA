<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;
use Illuminate\Notifications\Messages\MailMessage;
use App\Models\Fostering;

class ResguardoAcogimientoNotification extends Notification
{
    use Queueable;

    public $fostering;

    public function __construct(Fostering $fostering)
    {
        $this->fostering = $fostering;
    }

    public function via($notifiable)
    {
        return ['mail'];
    }

    public function toMail($notifiable)
    {
        return (new MailMessage)
            ->subject('Solicitud de acogida recibida')
            ->greeting('¡Gracias por tu solicitud!')
            ->line('Hemos recibido tu solicitud de acogida para ' . $this->fostering->animal->name . '.')
            ->line('Nos comunicaremos contigo a la brevedad.')
            ->line('📧 contacto@awra.com')
            ->line('https://awra.com/contacto')
            ->action('Ir a AWRA', url('/'))
            ->line('Este correo es tu comprobante de la gestión realizada.')
            ->salutation("Saludos,\nEl equipo de AWRA\n2025 AWRA todos los derechos reservados");
    }
}
