<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ValidationDeposit extends Model
{
    use HasFactory, HasUuids;
    protected $guarded = [];

    public function approval_validations()
    {
        return $this->hasMany(ApprovalValidation::class, 'validation_deposits_id', 'id');
    }

    public function users()
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }

    public function dealers()
    {
        return $this->belongsTo(Dealer::class, 'dealer_code', 'dealer_code');
    }

    public function validate_imgs()
    {
        return $this->hasMany(ValidateImage::class, 'validate_deposits_id', 'id');
    }

    public function proof_imgs()
    {
        return $this->hasMany(ValidationProofImage::class, 'validation_deposits_id', 'id');
    }
}
