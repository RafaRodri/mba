<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

/**
 * Model User
 */
class User extends Model
{
    // Definindo white lists através do atributo $fillable
    protected $fillable = ['cpf', 'nome', 'data-nascimento', 'rg', 'profile-id'];

    // Explicitar uso do soft delete
    protected $dates = ['deleted_at'];

    // Relacionamento "one-to-many (inverso)"
    function profile() {
        return $this->belongsTo('App\Profile', 'profile-id');
    }

    // Relacionamento "many-to-many"
    function apps() {
        return $this->belongsToMany('App\App', 'app_user', 'user-id', 'app-id');
    }
}
