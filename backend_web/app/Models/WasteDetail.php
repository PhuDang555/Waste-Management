<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class WasteDetail extends Model
{
    protected $table = 'waste_details';
    protected $fillable = [
        'waste_detail_name',
        'waste_group_id',
        'waste_type_id',
        'description',
        'created_at',
        'updated_at',
    ];

    public function wasteGroup()
    {
        return $this->belongsTo(WasteGroup::class, 'waste_group_id', 'id');
    }

    public function wasteType()
    {
        return $this->belongsTo(WasteType::class, 'waste_type_id', 'id');
    }


}
