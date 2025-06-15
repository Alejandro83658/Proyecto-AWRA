<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;
use Illuminate\Notifications\Messages\MailMessage;;

use App\Models\Sponsorship;

class NuevaSolicitudApadrinamientoNotification extends Notification
{
    use Queueable;

    public $sponsorship;

    public function __construct(Sponsorship $sponsorship)
    {
        $this->sponsorship = $sponsorship;
    }

    public function via($notifiable)
    {
        return ['database'];
    }


    public function toArray($notifiable)
    {
        return [
            'message' => 'Nueva solicitud de apadrinamiento de ' . ($this->sponsorship->user->name ?? 'Usuario'),
            'sponsorship_id' => $this->sponsorship->id,
            'animal_name' => $this->sponsorship->animal->name ?? '',
            'user_name' => $this->sponsorship->user->name ?? '',
        ];
    }
}
