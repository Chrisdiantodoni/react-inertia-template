<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CashierDeposit extends Model
{
    use HasFactory, HasUuids;
    protected $guarded = [];

    public function users()
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }

    public function cashier_images()
    {
        return $this->hasMany(CashierDepositImage::class, 'cashier_deposit_id', 'id');
    }

    public function approval_cashier()
    {
        return $this->hasMany(ApprovalCashierDeposit::class, 'cashier_deposit_id', 'id');
    }

    public function dealers()
    {
        return $this->belongsTo(Dealer::class, 'dealer_code', 'dealer_code');
    }
}
