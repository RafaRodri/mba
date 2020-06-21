<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

/**
 * Model App
 */
class App extends Model
{
    // Definindo white lists através do atributo $fillable
    protected $fillable = ['nome', 'bundle-id'];

    // Explicitar uso do soft delete
    protected $dates = ['deleted_at'];

    //Relacionamento "many-to-many"
    function users() {
        return $this->belongsToMany('App\User');
    }
}
