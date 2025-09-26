<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SysetmLogs extends Model
{
    protected $fillable = [
        'user_id',
        'user_role',
        'action',
        'is_hidden'
    ];

    public function users()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}
