<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

/**
 * Model App
 */
class App extends Model
{
    // Campos que podem ser enviados com atribuição em massa
    protected $fillable = ['nome', 'bundle-id'];

    // Explicitar uso do soft delete
    protected $dates = ['deleted_at'];

    //Relacionamento "many-to-many"
    function users() {
        return $this->belongsToMany('App\User');
    }
}
