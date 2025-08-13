<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('emergency_reports', function (Blueprint $table) {
            DB::statement("ALTER TABLE emergency_reports MODIFY request_status ENUM('pending', 'dispatched', 'completed', 'verified', 'rejected') DEFAULT 'pending'");
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('emergency_reports', function (Blueprint $table) {
            DB::statement("ALTER TABLE emergency_reports MODIFY request_status ENUM('pending', 'dispatched', 'completed') DEFAULT 'pending'");
        });
    }
};
