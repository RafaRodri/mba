<?php

use Illuminate\Database\Seeder;

/**
 * Seed para testes
 */
class UserSeed extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        App\User::create([
            'cpf' => 43407226004,
            'nome' => 'João da Silva',
            'data-nascimento' => '1990-01-01',
            'rg' => '454653542',
            'profile-id' => 3,
        ]);
    }
}
