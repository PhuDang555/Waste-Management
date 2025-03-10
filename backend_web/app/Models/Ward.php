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
        'provice_id',
        'district_id',
    ];

    public function provice(){
        return $this->belongsToMany(Provice::class, 'provice_id');
    }

    public function district(){
        return $this->belongsToMany(District::class, 'district_id');
    }
}
