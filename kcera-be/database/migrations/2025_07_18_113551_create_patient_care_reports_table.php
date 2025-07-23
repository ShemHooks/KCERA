
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
        Schema::create('patient_care_reports', function (Blueprint $table) {
            $table->id();
            $table->foreignId('response_id')->constrained('emergency_responses');
            $table->enum('triage', ['red', 'yellow', 'green', 'black'])->nullable();
            $table->boolean('trauma')->nullable();
            $table->boolean('medical')->nullable();
            $table->json('patient_information')->default(json_encode([
                    'lastname' => '',
                    'firstname' => '',
                    'middle' => '',
                    'age' => '',
                    'birthdate' => '',
                    'sex' => '',
                    'civil_status' => '',
            ]))->nullable();
            $table->string('address')->nullable();
            $table->enum('care_onprogress_upon_arrival', ['bystander', 'family', 'brgy personnel', 'pnp/cttramo', 'medical proffesional', 'ems', 'others'])->nullable();
            $table->json('signs&syntoms')->nullable();
            $table->json('allergies')->nullable();
            $table->json('medications')->nullable();
            $table->json('past_med')->nullable();
            $table->string('last_oral_intake')->nullable();
            $table->string('event_prior_to_illness')->nullable();
            $table->string('chief_complaint')->nullable();
            $table->enum('coma_scale_eye', [1, 2, 3, 4])->default(1);
            $table->enum('coma_scale_verbal', [1, 2, 3, 4, 5])->default(1);
            $table->enum('coma_scale_motor', [1, 2, 3, 4, 5, 6])->default(1);
            $table->json('vital_signs')->default(json_encode([
                    'time' => '',
                    'bp' => '',
                    'pr' => '',
                    'temp' => '',
                    'SpO2' => '',
                    'GCS' => '',
                    'capillary_refill' => '',
            ]));
            $table->enum('pulse', ['normal', 'bounding', 'tready', 'regular', 'irregular'])->default('normal');
            $table->enum('skin_color', ['normal', 'cyanotic', 'pale', 'flushed', 'jaundice', 'mottled', 'rashed'])->default('normal');
            $table->enum('skin_temp', ['normal', 'warm', 'cold'])->default('normal');
            $table->enum('skin_moisture', ['normal', 'moist', 'diaphoretic', 'dry'])->default('normal');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('patient_care_reports');
    }
};

