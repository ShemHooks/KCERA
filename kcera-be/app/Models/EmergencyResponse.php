<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class EmergencyResponse extends Model
{
    protected $fillable = [
        'request_id',
        'driver_id',
        'current_latitude',
        'current_longitude',
        'request_status'
    ];

    protected $casts = [
        'current_latitude' => 'float',
        'current_longitude' => 'float'
    ];

    public function report()
    {
        return $this->belongsTo(EmergencyReport::class, 'request_id');
    }

    public function driver()
    {
        return $this->belongsTo(User::class, 'driver_id');
    }

    public function responders()
    {
        return $this->hasMany(EmergencyResponder::class, 'response_id');
    }

    public function patientCareReport()
    {
        return $this->hasOne(PatientCareReport::class);
    }

    public function history()
    {
        return $this->hasOne(History::class);
    }

    public function relatedNotification()
    {
        return $this->hasOne(Notification::class, 'response_id');
    }

}
