<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class UserSocialite extends Model
{
    /**
    * Don't auto-apply mass assignment protection.
    *
    * @var array
    */
    protected $guarded = [];

    
    public function user(): BelongsToo
    {
        return $this->belongsTo(User::class);
    }
}
