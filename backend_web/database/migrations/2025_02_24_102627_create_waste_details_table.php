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
        Schema::create('waste_details', function (Blueprint $table) {
            $table->id();
            $table->string('waste_detail_name');
            $table->unsignedBigInteger('waste_group_id')->nullable();
            $table->unsignedBigInteger('waste_type_id')->nullable();
            $table->string('description')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('waste_details');
    }
};
