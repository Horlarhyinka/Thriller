
# NestJS Microservices Application

This project is a NestJS-based application comprising four microservices: User, Notification, Flight, and Booking. These microservices communicate with each other using rabbitMQ to provide a cohesive experience.

## Table of Contents

- [Installation](#installation)
- [Microservices](#microservices)
  - [User Microservice](#user-microservice)
  - [Notification Microservice](#notification-microservice)
  - [Flight Microservice](#flight-microservice)
  - [Booking Microservice](#booking-microservice)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)

## Installation

1. **Clone the repository:**
    \`\`\`bash
    git clone https://github.com/Horlarhyinka.git
    \`\`\`

2. **Install dependencies:**
    Navigate into each microservice directory and run:
    \`\`\`bash
    npm install
    \`\`\`

3. **Environment Variables:**
    Set up the necessary environment variables as required by each microservice.

4. **Run the microservices:**
    Navigate into each microservice directory and run:
    \`\`\`bash
    npm run start:dev
    \`\`\`

## Microservices

### User Microservice

Live url - [text](https://thriller-user.onrender.com)

Handles user authentication and management.

**Controller: AuthController**
- **Endpoints:**
  - \`POST /auth/login\`: User login
  - \`PUT /auth/forget-password\`: Request password reset
  - \`PATCH /auth/forget-password/:resetToken\`: Reset password
  - \`GET /auth/google\`: Google OAuth login
  - \`GET /auth/google/callback\`: Google OAuth callback

**Controller: UserController**
- **Endpoints:**
  - \`POST /user/\`: Create user
  - \`POST /user/admin\`: Create admin user

**DTOs:**
- \`CreateUserDto\`
- \`CreateAdminDto\`
- \`LoginDto\`
- \`ForgetPasswordDto\`
- \`ResetPasswordDto\`

### Notification Microservice

Handles email notifications.

**Controller: MailController**
- **Message Patterns:**
  - \`Channels.FORGET_PASSWORD\`: Send forget password email
  - \`Channels.RESET_PASSWORD\`: Send reset password email
  - \`Channels.CUSTOM_MAIL\`: Send custom email

### Flight Microservice

Manages flights and their details.

Live url - [text](https://thriller-flight.onrender.com)

**Controller: FlightController**
- **Endpoints:**
  - \`POST /flight\`: Create flight
  - \`PUT /flight/:id\`: Update flight
  - \`GET /flight\`: Get all flights
  - \`GET /flight/:id\`: Get flight by ID
  - \`DELETE /flight/:id\`: Delete flight

**DTOs:**
- \`CreateFlightDto\`
- \`UpdateFlightDto\`

### Booking Microservice

Manages flight bookings.

Live url - [text](https://thriller-booking.onrender.com)

**Controller: BookingController**
- **Endpoints:**
  - \`POST /booking/\`: Create booking
  - \`GET /booking/\`: Get user bookings
  - \`GET /booking/by-flight/:id\`: Get bookings by flight ID
  - \`GET /booking/by-user/:id\`: Get bookings by user ID
  - \`GET /booking/:id\`: Get booking by ID
  - \`DELETE /booking/:id\`: Delete booking

**DTOs:**
- \`CreateBookingDto\`

## Usage

Once all microservices are up and running, you can interact with them via their respective endpoints.

## API Endpoints

A comprehensive list of all the available API endpoints for each microservice can be found in the documentation provided within each microservice directory.

## Contributing

Contributions are welcome! Please read the [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

---
