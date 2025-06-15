<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
use App\Models\Fostering;

class NuevaSolicitudAcogimientoNotification extends Notification
{
    use Queueable;

    public $fostering;

    /**
     * Create a new notification instance.
     */
    public function __construct(Fostering $fostering)
    {
        $this->fostering = $fostering;
    }

    public function via($notifiable)
    {
        return ['database'];
    }


    public function toArray(object $notifiable): array
    {
        return [
            'message' => 'Nueva solicitud de acogida para ' . $this->fostering->animal->name . ' de ' . $this->fostering->user->name,
            'fostering_id' => $this->fostering->id,
            'animal_name' => $this->fostering->animal->name,
            'user_name' => $this->fostering->user->name,
        ];
    }
}
