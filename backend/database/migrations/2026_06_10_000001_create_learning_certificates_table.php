<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('learning_certificates', function (Blueprint $table) {
            $table->id();
            // No DB-level foreign key: the existing `users` table is MyISAM, which
            // cannot be the target of an InnoDB foreign key. The relationship is
            // enforced at the application layer (User::class) instead.
            $table->unsignedBigInteger('user_id')->index();
            $table->string('track');
            $table->string('certificate_title');
            $table->string('certificate_number')->unique();
            $table->timestamp('issued_at');
            $table->string('pdf_path')->nullable();
            $table->timestamps();

            // One certificate per user per track.
            $table->unique(['user_id', 'track']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('learning_certificates');
    }
};
