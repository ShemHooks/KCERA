<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Notification extends Model
{
    protected $fillable = [
        'receiver_id',
        'report_id',
        'response_id',
        'receiver_type',
        'type',
        'title',
        'message'
    ];

    public function receiver()
    {
        return $this->belongsTo(User::class, 'receiver_id');
    }

    public function relatedEmergencyReport()
    {
        return $this->belongsTo(EmergencyReport::class, 'report_id');
    }

    public function relatedEmergencyResponse()
    {
        return $this->belongsTo(EmergencyResponse::class, 'response_id');
    }
}
