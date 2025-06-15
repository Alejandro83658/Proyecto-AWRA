<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;
use Illuminate\Notifications\Messages\MailMessage;
use App\Models\Member;

class ResguardoSocioNotification extends Notification
{
    use Queueable;

    public $member;

    public function __construct(Member $member)
    {
        $this->member = $member;
    }

    public function via($notifiable)
    {
        return ['mail'];
    }

    public function toMail($notifiable)
    {
        return (new MailMessage)
            ->subject('Solicitud de socio/a recibida')
            ->greeting('¡Gracias por tu solicitud!')
            ->line('Hemos recibido tu solicitud para hacerte socio/a de AWRA.')
            ->line('Nos comunicaremos contigo a la brevedad.')
            ->line('📧 contacto@awra.com')
            ->line('https://awra.com/contacto')
            ->action('Ir a AWRA', url('/'))
            ->line('Este correo es tu comprobante de la gestión realizada.')
            ->salutation("Saludos,\nEl equipo de AWRA\n2025 AWRA todos los derechos reservados");
    }
}
