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
            'nome' => 'João da Silva',
            'cpf' => '43407226004',
            'rg' => '454653542',
            'data_nascimento' => '1990-01-01',
            'email' => 'admin@mba.com',
            'password' => bcrypt("123"),
            'profile_id' => 3,
        ]);
    }
}
