<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Feature extends Model
{
    protected $table = 'features';
    protected $fillable = [
        'name', 
        'description', 
        'status', 
        'created_at', 
        'updated_at'
    ];

    public function featurePermissions()
    {
        return $this->hasMany(FeaturePermission::class, 'feature_id');
    }
}
