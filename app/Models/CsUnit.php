<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CsUnit extends Model
{
    use HasFactory, HasUuids;
    protected $guarded = [];

    public function unit_nominal_dtls()
    {
        return $this->belongsTo(UnitNominalDtl::class, 'unit_nominal_dtl_id', 'id');
    }
    public function unit_images()
    {
        return $this->hasMany(UnitImage::class, 'cs_units_id', 'id');
    }
    public function approval_cs_cashiers_units()
    {
        return $this->hasMany(ApprovalCsCashiersUnit::class, 'cs_units_id', 'id');
    }
    public function users()
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }

    public function dealers()
    {
        return $this->belongsTo(Dealer::class, 'dealer_code', 'dealer_code');
    }
}
