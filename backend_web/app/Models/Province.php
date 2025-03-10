<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Province extends Model
{
    protected $table = 'provinces';

    protected $fillable = [
        'id',
        'name',
        'full_name',
    ];

    public function districts(){
        return $this->hasMany(District::class, 'province_id');
    }

    public function wards(){
        return $this->hasMany(Ward::class, 'province_id');
    }
}
