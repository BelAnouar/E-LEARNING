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
        Schema::create('files', function (Blueprint $table) {
            $table->increments("idFiles");
            $table->string("File");
            $table->string('name');
            $table->string('type');
            $table->integer('size');
            $table->date('lastModified');
            $table->unsignedInteger('idWeek');
            $table->timestamps();
            $table->foreign('idWeek')->references('idweek')->on('weeks')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('files');
    }
};
