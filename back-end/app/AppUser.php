<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

/**
 * Model App
 */
class AppUser extends Model
{
    // Especificando tabela
    protected $table    = 'app_user';

    // Definindo white lists através do atributo $fillable
    protected $fillable = ['user-id', 'app-id'];

    // Explicitar uso do soft delete
    protected $dates = ['deleted_at'];
}