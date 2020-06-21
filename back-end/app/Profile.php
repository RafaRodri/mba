<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Profile extends Model
{
    protected $fillable = ['titulo'];

    protected $dates = ['deleted_at'];

    public function users()
    {
        return $this->hasMany('App\User');
    }
}
