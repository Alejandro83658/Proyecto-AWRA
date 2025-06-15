<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;
use Illuminate\Notifications\Messages\MailMessage;
use App\Models\Volunteer;

class NuevaSolicitudVoluntariadoNotification extends Notification
{
    use Queueable;

    public $volunteer;

    public function __construct(Volunteer $volunteer)
    {
        $this->volunteer = $volunteer;
    }

    public function via($notifiable)
    {
        return ['database'];
    }

    public function toArray($notifiable)
    {
        return [
            'message' => 'Nueva solicitud de voluntariado de ' . ($this->volunteer->user->name ?? 'Usuario'),
            'volunteer_id' => $this->volunteer->id,
            'user_name' => $this->volunteer->user->name ?? '',
        ];
    }
}
