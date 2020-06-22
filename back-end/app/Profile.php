<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

/**
 * Model Profile
 */
class Profile extends Model
{
    // Campos que podem ser enviados com atribuição em massa
    protected $fillable = ['titulo'];

    // Explicitar uso do soft delete
    protected $dates = ['deleted_at'];

    // Relacionamento "one-to-many"
    public function users()
    {
        return $this->hasMany('App\User');
    }
}
