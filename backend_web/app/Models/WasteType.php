<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class WasteType extends Model
{
    protected $table = 'waste_types';

    protected $fillable = [
        'waste_group_id',
        'waste_type_name',
        'created_at',
        'updated_at',
    ];

    public  function wasteGroup()
    {
        return $this->belongsTo(WasteGroup::class, 'waste_group_id', 'id');
    }
}
