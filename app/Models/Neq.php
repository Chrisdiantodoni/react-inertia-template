<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Neq extends Model
{
    use HasFactory;

    protected $guarded = [];

    public function dealer_users()
    {
        return $this->belongsToMany(DealerUser::class, 'dealer_code', 'dealer_code');
    }
}
