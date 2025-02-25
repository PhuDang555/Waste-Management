<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class WasteGroup extends Model
{
    protected $table = "waste_groups";
    protected $fillable = [
        'waste_group_name',
        'description',
        'created_at',
        'updated_at',
    ];

    public function wasteType()
    {
        return $this->hasMany(WasteType::class, 'waste_group_id', 'id');
    }

    public function wasteDetail()
    {
        return $this->hasMany(WasteDetail::class, 'waste_group_id', 'id');
    }
}
