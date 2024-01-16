<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('payements', function (Blueprint $table) {
            $table->increments("idPayement");
            $table->string("Card_Number");
            $table->date("dateN");
            $table->string("name_card");
            $table->string("email");
            $table->string("cvv_code");
            $table->unsignedInteger('idCour');
            $table->timestamps();
            $table->foreign('idCour')->references('idCours')->on('cours')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('payements');
    }
};
