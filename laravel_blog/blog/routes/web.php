<?php

use App\Livewire\Student\StudentCreate;
use App\Livewire\Student\StudentEdit;
use App\Livewire\Student\StudentShow;
use Illuminate\Support\Facades\Route;
use Livewire\Volt\Volt;

Route::get('/', function () {
    return view('welcome');
})->name('home');

Route::view('dashboard', 'dashboard')
    ->middleware(['auth', 'verified'])
    ->name('dashboard');

Route::middleware(['auth'])->group(function () {

    Route::get("/students", StudentShow::class)->name("students.index");
    Route::get("/student/create", StudentCreate::class)->name("students.create");
    Route::get("/student/{id}/edit", StudentEdit::class)->name("student.edit");

    Route::redirect('settings', 'settings/profile');

    Volt::route('settings/profile', 'settings.profile')->name('settings.profile');
    Volt::route('settings/password', 'settings.password')->name('settings.password');
    Volt::route('settings/appearance', 'settings.appearance')->name('settings.appearance');
});

require __DIR__ . '/auth.php';
