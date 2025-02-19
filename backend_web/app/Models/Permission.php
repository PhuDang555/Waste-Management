<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\User;

class Permission extends Model
{
    protected $table = 'permissions';

    protected $fillable = [
        'permission_name'
    ];

    public function users(){
        return $this->hasMany(User::class,'permission_id');
    }
}
