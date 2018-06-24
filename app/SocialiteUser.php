<?php

namespace App;

class SocialiteUser
{
    protected $email;

    protected $id;

    public function __construct(array $payload)
    {
        $this->email = $payload['email'];
        $this->id = $payload['id'];
        $this->name = $payload['name'];
    }

    public function getEmail(): string
    {
        return $this->email;
    }

    public function getId(): string
    {
        return $this->id;
    }

    public function getName(): string
    {
        return $this->name;
    }
}
