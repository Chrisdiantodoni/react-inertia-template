<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Log;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Inertia\Response;
use Flasher\SweetAlert\Prime\SweetAlertInterface;

class AuthenticatedSessionController extends Controller
{
    /**
     * Display the login view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Login', [
            'canResetPassword' => Route::has('password.request'),
            'status' => session('status'),

        ]);
    }

    /**
     * Handle an incoming authentication request.
     */
    public function store(LoginRequest $request): RedirectResponse
    {
        try {
            $credentials = $request->only('email', 'password');
            $remember = $request->has('remember'); // Check if the 'remember' checkbox is checked

            if (Auth::attempt($credentials, $remember)) {
                $id = Auth::user()->id;
                $profileData = User::findOrFail($id);
                $username = $profileData->name;

                if ($profileData->status == 0) {
                    $notification = [
                        'message' => 'User ' . $username . ' telah dinonaktifkan',
                        'alert-type' => 'info'
                    ];
                    Auth::logout(); // Log out the user if their status is inactive
                } else {
                    $notification = array(
                        'type' =>  'success',
                        'message' => 'Login Successful'
                    );
                }
            }

            // Set flash message
            return redirect()->intended(route('dashboard', absolute: false))->with('message', $notification);
        } catch (\Exception $e) {
            Log::error('Login failed: ' . $e->getMessage());

            $notification = array(
                'type' =>  'error',
                'message' => 'Login Failed ' . $e->getMessage()
            );
            // Set flash message
            return redirect()->back()->with('message', $notification);
        }
    }


    /**
     * Destroy an authenticated session.
     */
    public function destroy(Request $request): RedirectResponse
    {
        Auth::guard('web')->logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return redirect('/');
    }
}
