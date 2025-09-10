<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
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
        Schema::create('programs', function (Blueprint $table) {
       $table->id();
            $table->string('title')->index();
            $table->text('description')->nullable();
            $table->string('duration');
            $table->string('level')->index();
            $table->string('category')->index();
            $table->decimal('price', 8, 2);
            $table->date('start_date');
            $table->date('end_date');
            $table->integer('max_students');
            $table->integer('current_enrollments')->default(0);
            $table->string('status')->default('active')->index();
            $table->timestamps();
            $table->index(['category', 'level']);
            $table->index(['status', 'start_date']);
            $table->index(['price', 'level']);
            $table->index('start_date');
            $table->index('end_date');
            $table->foreign('category')->references('name')->on('categories')->onUpdate('cascade');
        });}
    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('programs');
    }
};
