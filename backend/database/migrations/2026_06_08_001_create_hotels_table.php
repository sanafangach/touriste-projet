<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('hotels', function (Blueprint $table) {
            $table->id();

            $table->foreignId('city_id')
                  ->constrained('cities')
                  ->onDelete('cascade');

            $table->string('name');
            $table->string('image')->nullable();
            $table->string('price')->default('0 MAD');      // e.g. "1200 MAD"
            $table->decimal('rating', 3, 1)->default(0);
            $table->string('reviews')->nullable();           // e.g. "1,4 k"
            $table->text('description')->nullable();
            $table->string('source')->default('Admin');      // "Google Maps", "Admin", etc.
            $table->text('maps_query')->nullable();
            // cheap | moderate | luxury — used to filter by budget
            $table->string('budget_level')->default('moderate');

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('hotels');
    }
};
