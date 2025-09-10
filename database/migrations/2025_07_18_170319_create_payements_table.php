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

    public function up(): void
    {
        
        Schema::create('payements', function (Blueprint $table) {
            $table->id();
            
          
            $table->foreignId('user_id')
                  ->constrained()
                  ->onDelete('cascade');
                $table->unsignedInteger('course_id');
            $table->foreign('course_id')->references('idCours')->on('cours')->onDelete('cascade');
            
         
            $table->decimal('amount', 10, 2);
            $table->string('payment_intent')->unique();
            $table->string('status')->default('pending');
            
        
            $table->string('stripe_customer_id')->nullable();
            $table->string('stripe_payment_method')->nullable();
            $table->string('stripe_invoice')->nullable();
            
            $table->timestamp('paid_at')->nullable();
            $table->timestamps();
            
          
            $table->index(['user_id', 'status']);
            $table->index(['course_id', 'status']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('payements');
    }
};