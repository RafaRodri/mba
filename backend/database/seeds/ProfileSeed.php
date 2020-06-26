<?php

use Illuminate\Database\Seeder;

/**
 * Seed para testes
 */
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
            'titulo' => 'Usuário Comum',
        ]);
        App\Profile::create([
            'titulo' => 'Gestor',
        ]);
        App\Profile::create([
            'titulo' => 'Admin',
        ]);
    }
}
