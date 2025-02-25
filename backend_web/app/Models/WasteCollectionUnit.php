<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class WasteCollectionUnit extends Model
{
    protected $table = 'waste_collection_units';
    protected $fillable = [
        'display_name',
        'address',
        'province_id',
        'district_id',
        'ward_id',
        'unit_type',
        'tax_code',
        'ward_name',
        'phone_number',
        'avatar',
        'license',
    ];

    public function wasteCollectionMannagementUnit()
    {
        return $this->hasMany(WasteCollectionMannagement::class, 'waste_collection_unit_id', 'id');
    }

    public function wasteCollectionMannagementProcess()
    {
        return $this->belongsTo(WasteCollectionMannagement::class, 'waste_processing_unit_id', 'id');
    }


}
