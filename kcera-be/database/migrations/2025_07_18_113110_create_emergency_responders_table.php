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
        Schema::create('emergency_responders', function (Blueprint $table) {
            $table->id();
            $table->foreignId('response_id')->constrained('emergency_responses');
            $table->foreignId('user_id')->constrained('users');
            $table->enum('role_in_response', ['lead', 'support'])->default('support');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('emergency_responders');
    }
};
