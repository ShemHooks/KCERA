<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable, HasApiTokens; 

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'gender',
        'role',
        'phone',
        'address',
        'front_id_photo',
        'back_id_photo',
        'face_photo',
        'required_change_pass',
        'approval_status',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    public function profilePicture()
    {
        return $this->hasOne(UserProfilePicture::class);
    }

    public function emergencyReports()
    {
        return $this->hasMany(EmergencyReport::class);
    }

    public function responseAsDriver()
    {
        return $this->hasOne(EmergencyResponse::class, 'driver_id');
    }

    public function responseAsResponder()
    {
        return $this->hasMany(EmergencyResponder::class);
    }

}
