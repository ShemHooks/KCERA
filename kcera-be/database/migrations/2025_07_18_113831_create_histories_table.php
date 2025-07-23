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
        Schema::create('histories', function (Blueprint $table) {
            $table->id();
            $table->foreignId('response_id')->constrained('emergency_responses');
            $table->foreignId('patient_care_report_id')->constrained('patient_care_reports');
            $table->dateTime('response_time');
            $table->dateTime('site_arrival')->nullable();
            $table->dateTime('site_departure')->nullable();
            $table->string('vehicle_number')->nullable();           
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('histories');
    }
};
