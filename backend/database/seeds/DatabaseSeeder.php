<?php

use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Model;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        Model::unguard();

        $this->call(ProfileSeed::class);
        $this->call(AppSeed::class);
        $this->call(UserSeed::class);
        $this->call(AppUserSeed::class);

        Model::reguard();
    }
}
