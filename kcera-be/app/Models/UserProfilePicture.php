<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class UserProfilePicture extends Model
{    
    protected $fillable = ['user_id', 'profile_photo_link']; 

    public function user()
    {
        return $this->belongsTo(User::class);
    }

}
