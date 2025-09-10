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
        Schema::create('applications', function (Blueprint $table) {
               $table->id();
            $table->unsignedBigInteger('program_id');
            $table->foreign('program_id')
                  ->references('id')
                  ->on('programs')
                  ->onUpdate('cascade')
                  ->onDelete('cascade');
            $table->string('student_name', 255);
            $table->string('student_email', 255);
            $table->string('student_phone', 50)->nullable();
            $table->text('message')->nullable();
            $table->enum('status', ['pending', 'approved', 'rejected'])
                  ->default('pending');
            $table->timestamps();
            $table->index('program_id', 'idx_applications_program_id');
            $table->index('status', 'idx_applications_status');
            $table->index('student_email', 'idx_applications_student_email');
            $table->index('created_at', 'idx_applications_created_at');
            $table->index(['status', 'program_id'], 'idx_applications_status_program');
            $table->index(['student_email', 'program_id'], 'idx_applications_email_program');
        });
        
        DB::statement("ALTER TABLE applications ADD CONSTRAINT chk_student_name_not_empty CHECK (LENGTH(TRIM(student_name)) > 0)");
        DB::statement("ALTER TABLE applications ADD CONSTRAINT chk_student_email_format CHECK (student_email REGEXP '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}$')");
    
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('applications');
    }
};
