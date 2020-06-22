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

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'nome', 'email', 'password', 'cpf', 'data-nascimento', 'rg', 'profile-id'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    /**
     * Explicitar uso do soft delete
     *
     * @var array
     */
    protected $dates = [
        'deleted_at'
    ];

    /**
     * Relacionamento "one-to-many (inverso)"
     */
    function profile() {
        return $this->belongsTo('App\Profile', 'profile-id');
    }

    /**
     * Relacionamento "many-to-many"
     */
    function apps() {
        return $this->belongsToMany('App\App', 'app_user', 'user-id', 'app-id');
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