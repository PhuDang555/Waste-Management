<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Provice extends Model
{
    protected $table = 'provinces';

    protected $fillable = [
        'id',
        'name',
        'full_name',
    ];

    public function districts(){
        return $this->hasMany(District::class, 'provice_id');
    }

    public function wards(){
        return $this->hasMany(Ward::class, 'provice_id');
    }
}
