<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class AppServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        //
    }

    public function boot(): void
    {
        Schema::defaultStringLength(191);

        // Compartir el número de notificaciones no leídas con todas las vistas Inertia
         Inertia::share([
        'unreadNotificationsCount' => fn() => Auth::check() ? Auth::user()->unreadNotifications()->count() : 0,
        // Compartir el nombre de usuario con todas las vistas Inertia
        'userRole' => fn() => Auth::check() ? Auth::user()->getRoleNames()->first() : null,
    ]);
    }
}
