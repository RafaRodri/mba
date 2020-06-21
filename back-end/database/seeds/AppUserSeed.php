<?php

use Illuminate\Database\Seeder;

/**
 * Seed para testes
 */
class AppUserSeed extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        App\AppUser::create([
            'user-id' => 1,
            'app-id' => 1,
        ]);
        App\AppUser::create([
            'user-id' => 1,
            'app-id' => 2,
        ]);
        App\AppUser::create([
            'user-id' => 1,
            'app-id' => 3,
        ]);
    }
}
