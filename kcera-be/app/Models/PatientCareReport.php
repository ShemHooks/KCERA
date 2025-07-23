<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PatientCareReport extends Model
{
    protected $fillable = [
        'response_id', 'triage', 'trauma', 'medical', 'patient_information',
        'address', 'care_onprogress_upon_arrival', 'signs&syntoms', 'allergies',
        'medications', 'past_med', 'last_oral_intake', 'event_prior_to_illness',
        'chief_complaint', 'coma_scale_eye', 'coma_scale_verbal', 'coma_scale_motor',
        'vital_signs', 'pulse', 'skin_color', 'skin_temp', 'skin_moisture',
    ];

    protected $casts = [
        'trauma' => 'boolean',
        'medical' => 'boolean',
        'patient_information' => 'array',
        'signs&syntoms' => 'array',
        'allergies' => 'array',
        'medications' => 'array',
        'past_med' => 'array',
        'vital_signs' => 'array',
    ];

    public function response()
    {
        return $this->belongsTo(EmergencyResponse::class);
    }

    public function history()
    {
        return $this->hasOne(History::class);
    }
}
