<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SupportCustomer extends Model
{
    protected $table = 'support_customers';

    protected $fillable = [
        'id',
        'tai_khoan_id',
        'content',
        'status',
    ];

    public function users(){
        return $this->belongsToMany(User::class, 'user_id');
    }
}
