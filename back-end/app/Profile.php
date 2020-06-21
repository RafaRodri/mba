<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

/**
 * Model Profile
 */
class Profile extends Model
{
    // Definindo white lists através do atributo $fillable
    protected $fillable = ['titulo'];

    // Explicitar uso do soft delete
    protected $dates = ['deleted_at'];

    // Relacionamento "one-to-many"
    public function users()
    {
        return $this->hasMany('App\User');
    }
}
