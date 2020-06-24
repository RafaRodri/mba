<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateAppUserTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        /**
        * Configuração da tabela app_user
        */
        Schema::create('app_user', function (Blueprint $table) {
            $table->increments('id');

            /**
             * Chaves Estrangeiras
             */
            $table->integer('user_id')->unsigned();
            $table->foreign('user_id')
                ->references('id')
                ->on('users')
                ->onDelete('cascade');  //delete cascade, para quando o ID de referência for deletado

            $table->integer('app_id')->unsigned();
            $table->foreign('app_id')
                ->references('id')
                ->on('apps')
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
        Schema::dropIfExists('app_user');
    }
}
