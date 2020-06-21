<?php

use Illuminate\Database\Seeder;

/**
 * Seed para testes
 */
class AppSeed extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        App\App::create([
            'nome' => 'Aplicativo A',
            'bundle-id' => 'com.aplicativoa.demo',
        ]);
        App\App::create([
            'nome' => 'Aplicativo B',
            'bundle-id' => 'com.aplicativob.demo',
        ]);
        App\App::create([
            'nome' => 'Aplicativo C',
            'bundle-id' => 'com.aplicativoc.demo',
        ]);
        App\App::create([
            'nome' => 'Aplicativo D',
            'bundle-id' => 'com.aplicativod.demo',
        ]);
        App\App::create([
            'nome' => 'Aplicativo E',
            'bundle-id' => 'com.aplicativoe.demo',
        ]);
    }
}
