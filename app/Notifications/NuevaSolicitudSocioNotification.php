<?php

namespace App\Notifications;

use App\Models\Member;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;
use Illuminate\Notifications\Messages\MailMessage;;

use Illuminate\Notifications\Messages\DatabaseMessage;

class NuevaSolicitudSocioNotification extends Notification
{
    use Queueable;

    public $member;

    public function __construct(Member $member)
    {
        $this->member = $member;
    }

    public function via($notifiable)
    {
        return ['database'];
    }

    public function toArray($notifiable)
    {
        return [
            'message' => 'Nueva solicitud de socio/a de ' . $this->member->user->name,
            'member_id' => $this->member->id,
            'user_name' => $this->member->user->name,
        ];
    }
}
