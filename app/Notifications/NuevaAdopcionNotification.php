<?php


namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Notification;
use App\Models\Adoption;

class NuevaAdopcionNotification extends Notification
{
    use Queueable;

    public $adoption;

    public function __construct(Adoption $adoption)
    {
        $this->adoption = $adoption;
    }

    public function via($notifiable)
    {
        return ['database'];
    }



    public function toArray($notifiable)
    {
        return [
            'adoption_id' => $this->adoption->id,
            'animal_name' => $this->adoption->animal->name,
            'user_name' => $this->adoption->user->name,
            'message' => "Nueva solicitud de adopción para {$this->adoption->animal->name} de {$this->adoption->user->name}.",
        ];
    }
}
