<?php

namespace App\Traits;

use App\SocialiteUser;
use App\UserSocialite;
use Illuminate\Database\Eloquent\Relations\HasMany;

trait Socialtables
{
    public function socialites(): HasMany
    {
        return $this->hasMany(UserSocialite::class);
    }

    public function hasLinkedTo(string $provider): bool
    {
        return $this->socialites()->where('provider', $provider)->exists();
    }

    public function hasNotLinkedTo(string $provider): bool
    {
        return !$this->hasLinkedTo($provider);
    }

    public function linkTo(string $provider, SocialiteUser $socialiteUser): UserSocialite
    {
        return $this->socialites()->create([
            'provider' => $provider,
            'provider_id' => $socialiteUser->getId()
        ]);
    }

    public static function socialiteLinkExistingOrCreating(string $provider, SocialiteUser $socialiteUser): self
    {
        $user = static::whereEmail($socialiteUser->getEmail())
            ->orWhereHas('socialites', function ($query) use ($socialiteUser, $provider) {
                $query->where('provider', $provider)->where('provider_id', $socialiteUser->getId());
            })->first();

        return $user = $user ?? static::create([
            'email' => $socialiteUser->getEmail(),
            'name' => $socialiteUser->getName()
        ]);
    }
}
