<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;
use Hash;
use Illuminate\Support\Str;


class StaffSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
          User::create([
            'name' => 'Admin Account',
            'email' => 'admin@kcera.test',
            'password' => Hash::make('password'),
            'gender' => 'male',
            'role' => 'admin',
            'status' => 'active',
            'approval_status' => 'approved',
            'phone' => '09123456789',
            'address' => 'Kabankalan City Hall',
            'email_verified_at' => now(),
            'remember_token' => Str::random(10),
        ]);

      
        User::factory()->count(2)->create([
            'role' => 'driver',
            'status' => 'active',
            'approval_status' => 'approved',
        ]);

       
        User::factory()->count(2)->create([
            'role' => 'responder',
            'status' => 'active',
            'approval_status' => 'approved',
        ]);
    }
}
