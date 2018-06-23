# Laravel-React SPA

Starter Boilerplate SPA made with Laravel and React.

## Features

- Laravel 5.6, React, Redux, React Router
- Authentication with JWT
- Login, register, reset password
- Flexible Page Layout
- Flexible, Protected Routing
- Tailwind CSS
- ESlint

## Installation

- Clone the repo
- Copy .env.example to .env
- Generate app key

```bash
php artisan key:generate
```

- Installing all Composer & NPM dependencies.

```bash
composer install && npm install
 ```

- Run database migration

```bash
php artisan migrate:fresh
```

- Generate JWT secret

```bash
php artisan jwt:secret
```

- Compiling Assets

```bash
npm run dev
```

- Boot up a server

```bash
php artisan serve
```
