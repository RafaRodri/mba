<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

/**
 * Migration criada através do CLI, para a tabela users
 */
class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        /**
        * Configuração da tabela users
        */
        Schema::create('users', function (Blueprint $table) {
            /**
             * Dados Pessoais
             */
            $table->increments('id');
            $table->string('nome', 255);
            $table->string('cpf', 11)->unique();
            $table->string('rg', 15);
            $table->date('data-nascimento');  

            /**
             * Auth
             */
            $table->string('email', 80)->unique();          
            $table->string('password', 254);

            /**
             * Redefinição de senha
             */
            $table->rememberToken();
            
            /**
             * Chave Estrangeira
             */
            $table->integer('profile-id')->unsigned();
            $table->foreign('profile-id')
                ->references('id')
                ->on('profiles')
                ->onDelete('cascade');  //delete cascade, para quando o ID de referência for deletado

            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('users');
    }
}
