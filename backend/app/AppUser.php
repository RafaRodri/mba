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

    // Campos que podem ser enviados com atribuição em massa
    protected $fillable = ['user_id', 'app_id'];

    // Explicitar uso do soft delete
    protected $dates = ['deleted_at'];
}
