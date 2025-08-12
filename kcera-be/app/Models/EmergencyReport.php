<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class EmergencyReport extends Model
{
    protected $fillable = [
        'user_id',
        'request_type',
        'request_status',
        'request_date',
        'latitude',
        'longitude',
        'request_photo'
    ];

    protected $casts = [
        'request_date' => 'datetime',
        'latitude' => 'float',
        'longitude' => 'float'
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function response()
    {
        return $this->hasOne(EmergencyResponse::class, 'request_id');
    }
}
