<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;
use Illuminate\Notifications\Messages\MailMessage;
use App\Models\Sponsorship;

class ResguardoApadrinamientoNotification extends Notification
{
    use Queueable;

    public $sponsorship;

    public function __construct(Sponsorship $sponsorship)
    {
        $this->sponsorship = $sponsorship;
    }

    public function via($notifiable)
    {
        return ['mail'];
    }

    public function toMail($notifiable)
    {
        return (new MailMessage)
            ->subject('Solicitud de apadrinamiento recibida')
            ->greeting('¡Gracias por tu solicitud!')
            ->line('Hemos recibido tu solicitud de apadrinamiento para ' . ($this->sponsorship->animal->name ?? 'el animal') . '.')
            ->line('Nos comunicaremos contigo a la brevedad.')
            ->line('📧 contacto@awra.com')
            ->line('https://awra.com/contacto')
            ->action('Ir a AWRA', url('/'))
            ->line('Este correo es tu comprobante de la gestión realizada.')
            ->salutation("Saludos,\nEl equipo de AWRA\n2025 AWRA todos los derechos reservados");
    }
}
