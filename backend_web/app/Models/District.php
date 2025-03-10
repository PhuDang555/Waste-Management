<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class District extends Model
{
    protected $table = 'districts';
    protected $fillable = [
        'id',
        'name',
        'full_name',
        'provice_id',
    ];

    public function provice(){
        return $this->belongsToMany(Provice::class, 'provice_id');
    }

    public function wards(){
        return $this->hasMany(Ward::class, 'district_id');
    }
}
