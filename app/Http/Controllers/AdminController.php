<?php


namespace App\Http\Controllers;

use Illuminate\Http\Request;

class AdminController extends Controller
{
    public function notificaciones()
    {
        $notifications = auth()->user()->notifications()
            ->orderBy('created_at', 'desc')
            ->paginate(10);

        return inertia('Admin/Notificaciones', [
            'notifications' => $notifications,
        ]);
    }

    // Marca como leída y redirige a la solicitud relacionada
    public function verNotificacion($id)
    {
        $notification = auth()->user()->notifications()->findOrFail($id);
        $notification->markAsRead();

        if (!empty($notification->data['adoption_id'])) {
            return redirect()->route('admin.adoptions.show', $notification->data['adoption_id']);
        }
        if (!empty($notification->data['volunteer_id'])) {
            return redirect()->route('admin.volunteers.show', $notification->data['volunteer_id']);
        }

        if (!empty($notification->data['sponsorship_id'])) {
            return redirect()->route('admin.sponsorships.show', $notification->data['sponsorship_id']);
        }

        if (!empty($notification->data['fostering_id'])) {
            return redirect()->route('admin.fosterings.show', $notification->data['fostering_id']);
        }

        if (!empty($notification->data['member_id'])) {
            return redirect()->route('admin.members.show', $notification->data['member_id']);
        }
        //  añadir aquí otros tipos (acogida, socio, etc.)
        // if (!empty($notification->data['fostering_id'])) { ... }

        return redirect()->back();
    }

    // Marca una notificación como leída (sin redirección especial)
    public function markAsRead(Request $request, $id)
    {
        $notification = auth()->user()->unreadNotifications()->find($id);

        if ($notification) {
            $notification->markAsRead();
        }

        return redirect()->back();
    }

    public function markAllAsRead()
    {
        auth()->user()->unreadNotifications->markAsRead();
        return redirect()->back()->with('success', 'Todas las notificaciones han sido marcadas como leídas.');
    }

    public function markAsUnread(Request $request, $id)
    {
        $notification = auth()->user()->notifications()->find($id);
        if ($notification && $notification->read_at) {
            $notification->update(['read_at' => null]);
        }
        return redirect()->back();
    }

    public function deleteNotification($id)
    {
        $notification = auth()->user()->notifications()->find($id);
        if ($notification) {
            $notification->delete();
        }
        return redirect()->back();
    }
}
