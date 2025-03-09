<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class FeaturePermission extends Model
{
    protected $table = 'permission_features';
    protected $fillable = [
        'feature_id', 
        'permission_id',
        'is_active',
        'created_at', 
        'updated_at'
    ];

    public function feature()
    {
        return $this->belongsTo(Feature::class, 'feature_id');
    }

    public function permission()
    {
        return $this->belongsTo(Permission::class, 'permission_id');
    }
}
