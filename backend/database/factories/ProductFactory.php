<?php

namespace Database\Factories;

use App\Models\Product;
use Illuminate\Database\Eloquent\Factories\Factory;

class ProductFactory extends Factory
{
    protected $model = Product::class;

    /**
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $names = [
            'Audifonos inalambricos',
            'Mochila para laptop',
            'Teclado mecanico',
            'Mouse ergonomico',
            'Monitor Full HD',
            'Power bank portatil',
            'Bocina Bluetooth',
            'Camara web HD',
            'Lampara de escritorio',
            'Silla de oficina',
        ];

        return [
            'name' => fake()->randomElement($names).' '.fake()->word(),
            'description' => 'Producto de alta calidad, ideal para uso diario en el hogar o la oficina.',
            'price' => fake()->randomFloat(2, 5, 500),
            'stock' => fake()->numberBetween(0, 100),
        ];
    }
}