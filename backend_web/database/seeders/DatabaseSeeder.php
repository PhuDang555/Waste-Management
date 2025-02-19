<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        DB::table('management_units')->insert([
            [
                'username' => 'ADMIN',
                'email' => 'admin@example.com',
                'password' => Hash::make('admin123'),
                'full_name' => 'Admin',
                'address' => 'HCM',
                'permission_id' => '1',
                'management_unit_id' => '0',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'username' => 'HCMDVCIQ8',
                'email' => 'user@example.com',
                'password' => Hash::make('user123'),
                'full_name' => 'Quản lý',
                'address' => 'HCM',
                'permission_id' => '2',
                'management_unit_id' => '1',
                'created_at' => now(),
                'updated_at' => now(),
            ]
        ]);

        DB::table('users')->insert([
            [
                'username' => 'ADMIN',
                'email' => 'admin@example.com',
                'password' => Hash::make('admin123'),
                'full_name' => 'Admin',
                'address' => 'HCM',
                'permission_id' => '1',
                'management_unit_id' => '0',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'username' => 'HCMDVCIQ8',
                'email' => 'user@example.com',
                'password' => Hash::make('user123'),
                'full_name' => 'Quản lý',
                'address' => 'HCM',
                'permission_id' => '2',
                'management_unit_id' => '1',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'username' => 'VHQ8CI',
                'email' => 'uservh@example.com',
                'password' => Hash::make('user123'),
                'full_name' => 'Vận hành',
                'address' => 'HCM',
                'permission_id' => '3',
                'management_unit_id' => '2',
                'created_at' => now(),
                'updated_at' => now(),
            ]
        ]);

        DB::table('permissions')->insert([
            [
                'permission_name' => 'ADMIN',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'permission_name' => 'QUẢN LÝ',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'permission_name' => 'VẬN HÀNH',
                'created_at' => now(),
                'updated_at' => now(),
            ]
        ]);
    }
}
