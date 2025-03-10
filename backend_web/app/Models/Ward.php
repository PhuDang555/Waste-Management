<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Ward extends Model
{
    protected $table = 'wards';
    protected $fillable = [
        'id',
        'name',
        'full_name',
        'province_id',
        'district_id',
    ];

    public function provice(){
        return $this->belongsToMany(Province::class, 'province_id');
    }

    public function district(){
        return $this->belongsToMany(District::class, 'district_id');
    }
}
