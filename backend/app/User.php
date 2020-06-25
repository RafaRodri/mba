<?php

namespace App;

use Illuminate\Notifications\Notifiable;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Tymon\JWTAuth\Contracts\JWTSubject;

/**
 * Model User
 */
class User extends Authenticatable implements JWTSubject
{
    use Notifiable;

    // Campos que podem ser enviados com atribuição em massa
    protected $fillable = [
        'nome', 'email', 'password', 'cpf', 'data_nascimento', 'rg', 'profile_id'
    ];

    // Campos que devem ficar ocultos
    protected $hidden = [
        'password', 'remember_token',
    ];

    // Campos que devem ser convertidos para tipos nativos
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];


    // Explicitar uso do soft delete
    protected $dates = [
        'deleted_at'
    ];

    // Relacionamento "one-to-many (inverso)"
    function profile()
    {
        return $this->belongsTo('App\Profile', 'profile_id');
    }

    // Relacionamento "many-to-many"
    function apps()
    {
        return $this->belongsToMany('App\App', 'app_user', 'user_id', 'app_id');
    }

    /**
     * Get the identifier that will be stored in the subject claim of the JWT.
     *
     * @return mixed
     */
    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    /**
     * Return a key value array, containing any custom claims to be added to the JWT.
     *
     * @return array
     */
    public function getJWTCustomClaims()
    {
        return [];
    }
}
