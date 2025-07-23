<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class EmergencyResponder extends Model
{
    protected $fillable = [
        'response_id', 'user_id', 'role_in_response'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function response(){
        return $this->belongsTo(EmergencyResponse::class);
    }
}
