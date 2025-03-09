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
        Schema::table('waste_collection_managements', function (Blueprint $table) {
            $table->unsignedBigInteger('waste_owner_id')->nullable()->after('waste_processing_unit_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('waste_collection_managements', function (Blueprint $table) {
            $table->dropColumn('waste_owner_id');
        });
    }
};
