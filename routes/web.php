<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\UserController;
use App\Http\Controllers\UserProfileController;
use App\Http\Controllers\AnimalController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\AdoptionController;
use App\Http\Controllers\SponsorshipController;
use App\Http\Controllers\VolunteerController;
use App\Http\Controllers\FosteringController;
use App\Http\Controllers\MemberController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\AdminController;

Route::get('/', [HomeController::class, 'index'])->name('home');

Route::get('nosotros', function () {
    return Inertia::render('nosotros');
})->name('nosotros');

Route::get('contacto', function () {
    return Inertia::render('contacto');
})->name('contacto');

Route::post('/contacto', [ContactController::class, 'store']);

Route::get('dona', function () {
    return Inertia::render('dona');
})->name('dona');

// Rutas públicas para animales
Route::get('/adopta', [AnimalController::class, 'index'])->name('animals.index');
Route::get('/adopta/{animal}', [AnimalController::class, 'show'])->name('animals.show');
Route::get('animals', [AnimalController::class, 'index'])->name('animals.index');

// Proceso de adopción
Route::get('/adopta/{animal}/adoptar', [AdoptionController::class, 'welcome'])->name('adoptions.welcome');
Route::get('/adopta/{animal}/formulario', [AdoptionController::class, 'form'])->name('adoptions.form');
Route::post('/adopta/{animal}/formulario', [AdoptionController::class, 'submit'])->name('adoptions.submit');

// Proceso de apadrinamiento
Route::get('/apadrina/bienvenida', [SponsorshipController::class, 'welcome'])->name('sponsorships.generalWelcome');
Route::get('/apadrina/{animal}/apadrinar', [SponsorshipController::class, 'welcome'])->name('sponsorships.welcome');
Route::get('/apadrina/{animal}/formulario', [SponsorshipController::class, 'form'])->name('sponsorships.form');
Route::post('/apadrina/{animal}/formulario', [SponsorshipController::class, 'submit'])->name('sponsorships.submit');

// Proceso de voluntariado
Route::get('/voluntario/bienvenida', [VolunteerController::class, 'welcome'])->name('volunteers.welcome');
Route::get('/voluntario/formulario', [VolunteerController::class, 'form'])->name('volunteers.form');
Route::post('/voluntario/formulario', [VolunteerController::class, 'submit'])->name('volunteers.submit');

// Proceso de acogida
Route::get('/acoge', [AnimalController::class, 'fosterIndex'])->name('animals.fosterIndex');
Route::get('/acoge/bienvenida', [FosteringController::class, 'welcome'])->name('fosterings.generalWelcome');
Route::get('/acoge/{animal}/bienvenida', [FosteringController::class, 'welcome'])->name('fosterings.welcome');
Route::get('/acoge/{animal}/formulario', [FosteringController::class, 'form'])->name('fosterings.form');
Route::post('/acoge/{animal}/formulario', [FosteringController::class, 'submit'])->name('fosterings.submit');

// Proceso de hacerse socio
Route::get('/socio/bienvenida', [MemberController::class, 'welcome'])->name('members.welcome');
Route::get('/socio/formulario', [MemberController::class, 'form'])->name('members.form');
Route::post('/socio/formulario', [MemberController::class, 'submit'])->name('members.submit');


Route::middleware(['auth', 'verified'])->get('/dashboard', fn() => Inertia::render('dashboard'))->name('dashboard');

// Rutas administrativas protegidas
// Rutas de administración
Route::middleware(['auth', 'verified', 'role:admin|super_admin|staff'])->prefix('admin')->group(function () {

     // Notificaciones (ADMIN)
    Route::get('notificaciones', [AdminController::class, 'notificaciones'])->name('admin.notificaciones');
    Route::get('notificaciones/ver/{id}', [AdminController::class, 'verNotificacion'])->name('admin.notificaciones.ver');
    Route::post('notificaciones/{id}/leer', [AdminController::class, 'markAsRead'])->name('admin.notificaciones.leer');
    Route::post('notificaciones/{id}/no-leida', [AdminController::class, 'markAsUnread'])->name('admin.notificaciones.no-leida');
    Route::delete('notificaciones/{id}', [AdminController::class, 'deleteNotification'])->name('admin.notificaciones.delete');

    // Gestión de roles (ADMIN)  
    Route::get('users/roles', [UserController::class, 'rolesIndex'])->name('admin.users.roles');
    Route::post('users/roles/update', [UserController::class, 'updateRoles'])->name('admin.users.roles.update');

    // Usuarios y perfiles (ADMIN)
    Route::resource('users', UserController::class)->names('admin.users');
    Route::resource('user-profiles', UserProfileController::class);

    // Animales (ADMIN)
    Route::get('animals', [AnimalController::class, 'adminIndex'])->name('admin.animals.index');    
    Route::get('animals/create', [AnimalController::class, 'create'])->name('admin.animals.create');
    Route::post('animals', [AnimalController::class, 'store'])->name('admin.animals.store');
    Route::get('animals/{animal}/edit', [AnimalController::class, 'edit'])->name('admin.animals.edit');
    Route::put('animals/{animal}', [AnimalController::class, 'update'])->name('admin.animals.update');
    Route::delete('animals/{animal}', [AnimalController::class, 'destroy'])->name('admin.animals.destroy');
    Route::get('animals/{animal}', [AnimalController::class, 'showAdmin'])->name('admin.animals.show');

    // Adopciones (ADMIN)    
    Route::get('adoptions', [AdoptionController::class, 'adminIndex'])->name('admin.adoptions.index');
    Route::get('adoptions/{adoption}', [AdoptionController::class, 'showAdmin'])->name('admin.adoptions.show');
    Route::put('adoptions/{adoption}/change-status', [AdoptionController::class, 'changeStatus'])->name('admin.adoptions.changeStatus');
    Route::get('adoptions/{adoption}/edit', [AdoptionController::class, 'edit'])->name('admin.adoptions.edit');
    Route::put('adoptions/{adoption}', [AdoptionController::class, 'update'])->name('admin.adoptions.update');

    // Voluntarios (ADMIN)
    Route::get('volunteers', [VolunteerController::class, 'adminIndex'])->name('admin.volunteers.index');
    Route::get('volunteers/{volunteer}', [VolunteerController::class, 'showAdmin'])->name('admin.volunteers.show');
    Route::get('volunteers/{volunteer}/edit', [VolunteerController::class, 'edit'])->name('admin.volunteers.edit');
    Route::put('volunteers/{volunteer}', [VolunteerController::class, 'update'])->name('admin.volunteers.update');

    // Apadrinamientos (ADMIN)
    Route::get('sponsorships', [SponsorshipController::class, 'adminIndex'])->name('admin.sponsorships.index');
    Route::get('sponsorships/{sponsorship}', [SponsorshipController::class, 'showAdmin'])->name('admin.sponsorships.show');
    Route::get('sponsorships/{sponsorship}/edit', [SponsorshipController::class, 'editAdmin'])->name('admin.sponsorships.edit');
    Route::put('sponsorships/{sponsorship}', [SponsorshipController::class, 'updateAdmin'])->name('admin.sponsorships.update');

    // Acogidas (ADMIN)
    Route::get('fosterings', [FosteringController::class, 'adminIndex'])->name('admin.fosterings.index');
    Route::get('fosterings/{fostering}', [FosteringController::class, 'showAdmin'])->name('admin.fosterings.show');
    Route::get('fosterings/{fostering}/edit', [FosteringController::class, 'editAdmin'])->name('admin.fosterings.edit');
    Route::put('fosterings/{fostering}', [FosteringController::class, 'updateAdmin'])->name('admin.fosterings.update');

    // Socios (ADMIN)
    Route::get('members', [MemberController::class, 'adminIndex'])->name('admin.members.index');
    Route::get('members/{member}', [MemberController::class, 'showAdmin'])->name('admin.members.show');
    Route::get('members/{member}/edit', [MemberController::class, 'editAdmin'])->name('admin.members.edit');
    //Route::put('members/{member}', [MemberController::class, 'updateAdmin'])->name('admin.members.update');

    
    Route::put('members/{member}', [MemberController::class, 'updateAdmin'])->name('admin.members.update');    
    });



// Cargar rutas adicionalesMore actions
require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
