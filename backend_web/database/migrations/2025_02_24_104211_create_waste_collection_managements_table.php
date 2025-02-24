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
        Schema::create('waste_collection_managements', function (Blueprint $table) {
            $table->id();
            $table->string('processing_time');
            $table->float('volume');
            $table->unsignedBigInteger('user_id')->nullable();
            $table->unsignedBigInteger('waste_type_id')->nullable();
            $table->unsignedBigInteger('waste_collection_unit_id')->nullable();
            $table->unsignedBigInteger('waste_processing_unit_id')->nullable();
            $table->string('note')->nullable();
            $table->string('image')->nullable();
            $table->string('license_plate')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('waste_collection_managements');
    }
};
