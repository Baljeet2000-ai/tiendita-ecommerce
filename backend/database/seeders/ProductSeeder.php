<?php

namespace Database\Seeders;

use App\Models\Product;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $products = [
            ['name' => 'Laptop Lenovo ThinkPad E14', 'description' => 'Laptop para oficina, Intel Core i5, 16GB RAM, 512GB SSD', 'price' => 899.99, 'stock' => 15],
            ['name' => 'Mouse Logitech MX Master 3', 'description' => 'Mouse inalambrico ergonomico con scroll de precision', 'price' => 99.99, 'stock' => 40],
            ['name' => 'Teclado mecanico Redragon K552', 'description' => 'Teclado mecanico RGB, switches rojos, retroiluminado', 'price' => 45.50, 'stock' => 30],
            ['name' => 'Monitor Samsung 27" Curvo', 'description' => 'Monitor curvo Full HD 1080p, 75Hz, ideal para oficina y gaming casual', 'price' => 189.99, 'stock' => 18],
            ['name' => 'Audifonos Sony WH-1000XM4', 'description' => 'Audifonos inalambricos con cancelacion de ruido activa', 'price' => 279.99, 'stock' => 22],
            ['name' => 'Smartwatch Xiaomi Mi Band 8', 'description' => 'Pulsera inteligente con monitor de ritmo cardiaco y notificaciones', 'price' => 39.99, 'stock' => 60],
            ['name' => 'Cargador USB-C 65W', 'description' => 'Cargador rapido compatible con laptops y celulares USB-C', 'price' => 24.99, 'stock' => 75],
            ['name' => 'Disco duro externo 1TB Seagate', 'description' => 'Disco portatil USB 3.0 para respaldo de archivos', 'price' => 54.99, 'stock' => 35],
            ['name' => 'Mochila para laptop Targus 15.6"', 'description' => 'Mochila acolchada resistente al agua con compartimento para laptop', 'price' => 42.00, 'stock' => 28],
            ['name' => 'Silla ergonomica de oficina', 'description' => 'Silla con soporte lumbar ajustable y reposabrazos', 'price' => 159.00, 'stock' => 12],
            ['name' => 'Lampara LED de escritorio', 'description' => 'Lampara regulable con puerto USB integrado', 'price' => 19.99, 'stock' => 50],
            ['name' => 'Camara web Logitech C920', 'description' => 'Camara Full HD 1080p con microfono integrado', 'price' => 69.99, 'stock' => 26],
            ['name' => 'Bocina Bluetooth JBL Flip 6', 'description' => 'Bocina portatil resistente al agua con sonido potente', 'price' => 89.99, 'stock' => 33],
            ['name' => 'Power bank 20000mAh Anker', 'description' => 'Bateria portatil de carga rapida para celulares y tablets', 'price' => 34.99, 'stock' => 45],
            ['name' => 'Tablet Samsung Galaxy Tab A9', 'description' => 'Tablet de 8.7", 64GB, ideal para entretenimiento y lectura', 'price' => 149.99, 'stock' => 20],
            ['name' => 'Impresora multifuncional HP DeskJet', 'description' => 'Impresora, escaner y copiadora con conexion WiFi', 'price' => 79.99, 'stock' => 14],
            ['name' => 'Router WiFi TP-Link Archer AX10', 'description' => 'Router WiFi 6, doble banda, alta velocidad', 'price' => 64.99, 'stock' => 24],
            ['name' => 'Funda protectora para celular', 'description' => 'Funda antigolpes transparente, compatible con varios modelos', 'price' => 9.99, 'stock' => 100],
            ['name' => 'Termo acero inoxidable 1L', 'description' => 'Termo para bebidas frias y calientes, mantiene temperatura 12h', 'price' => 17.50, 'stock' => 55],
            ['name' => 'Set de herramientas 45 piezas', 'description' => 'Kit de herramientas basicas para el hogar en estuche', 'price' => 32.00, 'stock' => 20],
            ['name' => 'Alfombrilla para mouse XL', 'description' => 'Mousepad extendido para escritorio, superficie antideslizante', 'price' => 12.99, 'stock' => 65],
            ['name' => 'Cafetera electrica Oster 12 tazas', 'description' => 'Cafetera de goteo programable con jarra de vidrio', 'price' => 39.99, 'stock' => 16],
        ];

        foreach ($products as $product) {
            Product::create($product);
        }
    }
}