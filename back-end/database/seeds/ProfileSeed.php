<?php

use Illuminate\Database\Seeder;

class ProfileSeed extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        App\Profile::create([
            'titulo' => 'usuário comum',
        ]);
        App\Profile::create([
            'titulo' => 'gestor',
        ]);
        App\Profile::create([
            'titulo' => 'admin',
        ]);
    }
}
