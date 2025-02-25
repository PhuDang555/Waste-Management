<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class WasteCollectionMannagement extends Model
{
    protected $table = "waste_collection_managements";
    protected $fillable = [
        'processing_time',
        'volume',
        'user_id',
        'waste_type_id',
        'waste_collection_unit_id',
        'waste_processing_unit_id',
        'note',
        'image',
        'license_plate',
        'created_at',
        'updated_at',
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }

    public function wasteType()
    {
        return $this->belongsTo(WasteType::class, 'waste_type_id', 'id');
    }

    public function wasteCollectionUnit()
    {
        return $this->belongsTo(WasteCollectionUnit::class, 'waste_collection_unit_id', 'id');
    }

    public function wasteProcessingUnit()
    {
        return $this->belongsTo(WasteCollectionUnit::class, 'waste_processing_unit_id', 'id');
    }
}
