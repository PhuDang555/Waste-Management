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
        Schema::create('management_units', function (Blueprint $table) {
            $table->id();
            $table->string('username',45)->unique();
            $table->string('email',45)->unique();
            $table->string('password');
            $table->string('full_name');
            $table->string('alternate_email',45)->nullable();
            $table->string('address')->nullable();
            $table->unsignedBigInteger('province_id')->nullable();
            $table->unsignedBigInteger('district_id')->nullable();
            $table->unsignedBigInteger('ward_id')->nullable();
            $table->string('avatar')->nullable();
            $table->string('phone_number', 16)->nullable();
            $table->string('license_expiration', 45)->nullable();
            $table->unsignedBigInteger('permission_id');
            $table->unsignedBigInteger('management_unit_id')->nullable();
            $table->boolean('is_blocked')->default(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('management_units');
    }
};
