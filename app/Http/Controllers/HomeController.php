<?php


namespace App\Http\Controllers;

use Illuminate\Http\Request;

class HomeController extends Controller
{
    public function index()
    {
        $carouselImages = [
            'img/varias/animalsTodos.jpg',
            'img/varias/vountarios3.jpg',
            'img/varias/AcogePerro.jpg',
            'img/varias/voluntarioRefugio.jpg',
            'img/varias/socioPeq.jpg',
            'img/varias/colaboraPerroGato.jpg',
        ];
        return inertia('Home/Index', [
            'carouselImages' => $carouselImages,
        ]);
    }
}