<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class History extends Model
{
    protected $fillable = [
        'response_id', 'patient_care_report_id', 'response_time', 
        'site_arrival', 'site_departure', 'vehicle_number'
    ];

    protected $casts = [
        'response_time' => 'datetime',
        'site_arrival' => 'datetime',
        'site_departure' => 'datetime'
    ];

    public function response()
    {
        return $this->belongsTo(EmergencyResponse::class);
    }

    public function patientCareReport()
    {
        return $this->belongsTo(PatientCareReport::class);
    }
}
