<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Coordinator extends Model
{
    use HasFactory, HasUuids;
    protected $guarded = [];


    public function dealers()
    {
        return $this->belongsTo(Dealer::class, 'dealer_code', 'dealer_code');
    }
}
