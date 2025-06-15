<?php

namespace App\Http\Controllers\Auth;
 
 use App\Http\Controllers\Controller;
 use App\Models\User;
 use Illuminate\Auth\Events\Registered;
 use Illuminate\Http\RedirectResponse;
 use Illuminate\Http\Request;
 use Illuminate\Support\Facades\Auth;
 use Illuminate\Support\Facades\Hash;
 use Illuminate\Validation\Rules;
 use Inertia\Inertia;
 use Inertia\Response;
 
 class RegisteredUserController extends Controller
 {
     /**
      * Show the registration page.
      */
     public function create(): Response
     {
         return Inertia::render('auth/register');
     }
 
     /**
      * Handle an incoming registration request.
      *
      * @throws \Illuminate\Validation\ValidationException
      */


     /*public function store(Request $request): RedirectResponse
     {
         $request->validate([
             'name' => 'required|string|max:255',             
             'email' => 'required|string|lowercase|email|max:255|unique:'.User::class,
             'password' => ['required', 'confirmed', Rules\Password::defaults()],
         ]);
 
         $user = User::create([
             'name' => $request->name,             
             'email' => $request->email,
             'password' => Hash::make($request->password),
         ]);
 
         event(new Registered($user));
 
         Auth::login($user);
 
         return to_route('dashboard');
     }*/

     public function store(Request $request): RedirectResponse // no funciona el de arriba es el original
{
    $request->validate([
        'name' => 'required|string|max:255',             
        'email' => 'required|string|lowercase|email|max:255|unique:users',
        'password' => ['required', 'confirmed', Rules\Password::defaults()],
    ]);

    $user = User::create([
        'name' => $request->name,             
        'email' => $request->email,
        'password' => Hash::make($request->password),
    ]);

    Auth::login($user);

    // Redirección personalizada usando el parámetro redirect
    $redirect = $request->query('redirect');
    if ($redirect && str_starts_with($redirect, '/')) {
        return redirect($redirect);
    }

    return redirect()->route('dashboard');
}
 }
