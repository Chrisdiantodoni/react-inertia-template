<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CashMutate extends Model
{
    use HasFactory, HasUuids;

    protected $guarded = [];
    public function users()
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }
    public function dealers()
    {
        return $this->belongsTo(Dealer::class, 'dealer_code', 'dealer_code');
    }

    public function approval_mutate()
    {
        return $this->hasMany(ApprovalMutateCash::class, 'cash_mutates_id', 'id');
    }
}
