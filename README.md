# E-Learning Platform

A modern e-learning platform built with Laravel and React, featuring course management, user authentication, payment processing, and more.

---

![Last Commit](https://img.shields.io/badge/last%20commit-February-blue?style=flat-square)  
![TypeScript](https://img.shields.io/badge/typescript-46.9%25-blue?style=flat-square)  
![Languages](https://img.shields.io/badge/languages-6-blue?style=flat-square)

---

## Built with the tools and technologies:

![Laravel](https://img.shields.io/badge/Laravel-FF2D20?logo=laravel&logoColor=white&style=flat-square)  
![PHP](https://img.shields.io/badge/PHP-777BB4?logo=php&logoColor=white&style=flat-square)  
![MySQL](https://img.shields.io/badge/MySQL-4479A1?logo=mysql&logoColor=white&style=flat-square)  
![React](https://img.shields.io/badge/React-20232A?logo=react&logoColor=61DAFB&style=flat-square)  
![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=white&style=flat-square)  
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black&style=flat-square)  
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white&style=flat-square)  
![Axios](https://img.shields.io/badge/Axios-5A29E4?logo=axios&logoColor=white&style=flat-square)  
![React Query](https://img.shields.io/badge/React%20Query-FF4154?logo=reactquery&logoColor=white&style=flat-square)  
![Stripe](https://img.shields.io/badge/Stripe-008CDD?logo=stripe&logoColor=white&style=flat-square)  
![Docker](https://img.shields.io/badge/Docker-2496ED?logo=docker&logoColor=white&style=flat-square)  
![npm](https://img.shields.io/badge/npm-CB3837?logo=npm&logoColor=white&style=flat-square)  
![JSON](https://img.shields.io/badge/JSON-000000?logo=json&logoColor=white&style=flat-square)  
![Markdown](https://img.shields.io/badge/Markdown-000000?logo=markdown&logoColor=white&style=flat-square)

---

## Features

- 🔐 User Authentication & Authorization
- 📚 Course Management
- 💳 Payment Integration with Stripe
- 📊 Admin Dashboard
- 📱 Responsive Design
- 📚 Program & Degrees Management
- 🎯 Category Management
- 📝 Application Processing

- 🔐 User Authentication & Authorization
- 📚 Course Management
- 💳 Payment Integration with Stripe
- 📊 Admin Dashboard
- 📱 Responsive Design
- 📚 Program & Degrees Management
- 🎯 Category Management
- 📝 Application Processing

## Tech Stack

- **Backend:**
  - Laravel 
  - MySQL Database
  - PHP

- **Frontend:**
  - React
  - Vite
  - React Query
  - Axios

- **Payment:**
  - Stripe Integration

## About The Project

This E-Learning platform is built on top of Laravel, leveraging its powerful features such as:

- [Simple, fast routing engine](https://laravel.com/docs/routing).
- [Powerful dependency injection container](https://laravel.com/docs/container).
- Multiple back-ends for [session](https://laravel.com/docs/session) and [cache](https://laravel.com/docs/cache) storage.
- Expressive, intuitive [database ORM](https://laravel.com/docs/eloquent).
- Database agnostic [schema migrations](https://laravel.com/docs/migrations).
- [Robust background job processing](https://laravel.com/docs/queues).
- [Real-time event broadcasting](https://laravel.com/docs/broadcasting).

Laravel is accessible, powerful, and provides tools required for large, robust applications.

## Installation & Setup

1. Clone the repository:
```bash
git clone https://github.com/BelAnouar/E-LEARNING.git
cd E-LEARNING
```

2. Install PHP dependencies:
```bash
composer install
```

3. Install Node.js dependencies:
```bash
npm install
```

4. Copy the environment file:
```bash
cp .env.example .env
```

5. Generate application key:
```bash
php artisan key:generate
```

6. Configure your database in `.env` file and Stripe keys:
```
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=your_database_name
DB_USERNAME=your_username
DB_PASSWORD=your_password

STRIPE_KEY=your_stripe_publishable_key
STRIPE_SECRET=your_stripe_secret_key
```

7. Run database migrations:
```bash
php artisan migrate
```

8. Configure MinIO (for file storage):

First, set up MinIO permissions:
```bash
docker run --rm -it --add-host=host.docker.internal:host-gateway minio/mc anonymous set-json /dev/stdin localminio/local @'
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": "*",
      "Action": [
        "s3:GetObject",
        "s3:PutObject",
        "s3:DeleteObject"
      ],
      "Resource": [
        "arn:aws:s3:::local/*"
      ]
    }
  ]
}
'@
```

Create MinIO configuration directory and set up alias:
```powershell
mkdir $HOME/.mc

docker run --rm -it `
  --add-host=host.docker.internal:host-gateway `
  -v "$HOME/.mc:/root/.mc" `
  minio/mc alias set localminio http://host.docker.internal:9000 admin admin123
```

## Development

1. Start the Laravel development server:
```bash
php artisan serve
```

2. Start the Vite development server:
```bash
npm run dev
```

The application will be available at `http://localhost:3000`

## Project Structure

The project follows a clear structure:

- `app/` - Contains Laravel backend code
  - `Http/Controllers/` - API Controllers
  - `Models/` - Database Models
  - `Providers/` - Service Providers
- `resources/js/page/` - Contains React frontend code
  - `components/` - Reusable React components
  - `pages/` - Page components
  - `lib/` - Utility functions and API calls
  - `contexts/` - React Context providers

## Features Details

### User Management
- User registration and authentication
- Role-based access control (Admin/User)
- User profile management

### Course Management
- Create and manage courses
- Upload course materials
- Video and PDF lesson support
- Course progress tracking

### Payment System
- Secure payment processing with Stripe
- Course purchase functionality
- Payment history

### Admin Dashboard
- User statistics
- Course analytics
- Application management
- Category management

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Website Preview

Here are some screenshots of our E-Learning platform:

### Admin Interface

#### Dashboard Statistics
![Dashboard Statistics](/public/images/design/2025%2C%2020_57_40%20GMT%2B1.png)
- Overview of platform metrics including users, courses, revenue, and activity

#### Programs Management
![Programs Management](/public/images/design/2025%2C%2020_57_17%20GMT%2B1.png)
- Comprehensive program listing with categories, duration, and pricing

#### Applications Management
![Applications Management](/public/images/design/2025%2C%2020_56_54%20GMT%2B1.png)
- Student application tracking and processing interface

#### Course Management
![Add Course Interface](/public/images/design/2025%2C%2020_56_24%20GMT%2B1.png)
- Interface for adding new courses to the platform

### User Interface

#### Registration
![Register as Admin](/public/images/design/2025%2C%2020_55_45%20GMT%2B1.png)
- Clean and simple registration interface

### Educational Content

#### Course Library
![Course Library](/public/images/design/2025%2C%2020_57_33%20GMT%2B1.png)
- Rich collection of educational materials and books

### Desktop Views
![Desktop View 1](/public/images/design/Desktop%20-%201.png)
![Desktop View 2](/public/images/design/Desktop%20-%202.png)
![Desktop View 3](/public/images/design/Desktop%20-%203.png)
![Desktop View 4](/public/images/design/Desktop%20-%204.png)

### Additional Features
![Feature 1](/public/images/design/Group%2014.png)
![Feature 2](/public/images/design/Group%2015.png)

## License

This project is licensed under the [MIT license](https://opensource.org/licenses/MIT).
