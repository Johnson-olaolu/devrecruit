# Dev Recruit
This is a robust Node.js/Express backend application built with TypeScript. The application provides a complete authentication system with user management capabilities.

## Key Features
- User authentication using JWT 
- MongoDB integration
- Redis support
- Docker configuration for development
- TypeScript for type safety
- Express middleware for validation and error handling
- Express validator for handling validating inputs

## Tech Stack

- Node.js/Express
- TypeScript
- MongoDB
- Mongoose
- Redis
- Docker
- Express validator for validation

## Getting Started

1. Clone the repository
2. Copy `.example.env` to `.env` and configure your environment variables
3. Run `npm install`
4. Start MongoDB and Redis using `docker-compose up -d`
5. Run `npm run dev` for development

## API Endpoints
- Login `/api/login` 
- SignUp `/api/signup`
- Users: `/api/user` (CRUD operations )
- Orders: `/apr/orders` (CRUD operation , query by status , get total revenue)

## Security Features
- Password hashing with bcrypt
- JWT authentication
- Input validation
- Cors security