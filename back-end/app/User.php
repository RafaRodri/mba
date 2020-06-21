<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class User extends Model
{
    protected $fillable = ['cpf', 'nome', 'data_nascimento', 'rg', 'profile_id'];

    protected $dates = ['deleted_at'];

    function profile() {
        return $this->belongsTo('App\Profile');
    }
}
