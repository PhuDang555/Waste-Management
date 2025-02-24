<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('monthly_waste_generations', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('waste_group_id')->nullable();
            $table->unsignedBigInteger('user_id')->nullable();
            $table->string('generation_date');
            $table->float('volume');
            $table->string('cycle', 45);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('monthly_waste_generations');
    }
};
