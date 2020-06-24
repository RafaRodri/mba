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
            'bundle_id' => 'com.aplicativoa.demo',
        ]);
        App\App::create([
            'nome' => 'Aplicativo B',
            'bundle_id' => 'com.aplicativob.demo',
        ]);
        App\App::create([
            'nome' => 'Aplicativo C',
            'bundle_id' => 'com.aplicativoc.demo',
        ]);
        App\App::create([
            'nome' => 'Aplicativo D',
            'bundle_id' => 'com.aplicativod.demo',
        ]);
        App\App::create([
            'nome' => 'Aplicativo E',
            'bundle_id' => 'com.aplicativoe.demo',
        ]);
    }
}
