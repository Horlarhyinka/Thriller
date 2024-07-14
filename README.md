
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

Handles user authentication,  and management.

**Controller: AuthController**

  **Live Link**
  visit the deployed link at [https://thriller-user.onrender.com](https://thriller-user.onrender.com)

  **Documentation**
  visit api documentation for this service at [see swagger doc](https://thriller-user.onrender.com/apidocs)

- **Endpoints:**
  - \`POST /auth/login\`: User login
  - \`PUT /auth/forget-password\`: Request password reset
  - \`PATCH /auth/forget-password/:resetToken\`: Reset password
  - \`GET /auth/google\`: Google OAuth login
  - \`GET /auth/google/callback\`: Google OAuth callback

**Controller: UserController**
- **Endpoints:**
  - \`POST /user/\`: Create user
  - \`POST /user/admin\`: Create admin user (this endpoint requires authentication and can only be accessed by a user account with SUPERADMIN role)


### Notification Microservice

Handles email notifications.
this is a message queue based microservice with no REST API endpoint (note: email is currently configured with mailtrap and you will not receive them in your inbox, you can generate email app password and username and use as MAIL_PASSWORD and MAIL_USER respectively in the notification service .env)

**Controller: MailController**
- **Message Patterns:**
here are the registered queue channels for the notification service.
  - \`Channels.FORGET_PASSWORD\`: Send forget password email
  - \`Channels.RESET_PASSWORD\`: Send reset password email
  - \`Channels.CUSTOM_MAIL\`: Send custom email

### Flight Microservice

Manages flightn details and communicates with the booking service (for flight booking) and user service (for authorization)  using rabbitmq event.


**Live link**
  visit the deployed link at [https://thriller-flight.onrender.com](https://thriller-flight.onrender.com)

  **Documentation**
  visit api documentation for this service at [see swagger doc](https://thriller-flight.onrender.com/apidocs)


**Controller: FlightController**
- **Endpoints:**
  - \`POST /flight\`: Create flight (ADMIN role only)
  - \`PUT /flight/:id\`: Update flight (ADMIN role only)
  - \`GET /flight\`: Get all flights
  - \`GET /flight/:id\`: Get flight by ID
  - \`DELETE /flight/:id\`: Delete flight (ADMIN role only)

### Booking Microservice

Manages flight bookings and communicate with the user and flight microservice through rabbitmq events.

**Live link**
  visit the deployed link at [https://thriller-booking.onrender.com](https://thriller-booking.onrender.com)

  **Documentation**
  visit api documentation for this service at [see swagger doc](https://thriller-booking.onrender.com/apidocs)


**Controller: BookingController**
- **Endpoints:**
  - \`POST /booking/\`: Create booking
  - \`GET /booking/\`: Get user bookings
  - \`GET /booking/by-flight/:id\`: Get bookings by flight ID
  - \`GET /booking/by-user/:id\`: Get bookings by user ID
  - \`GET /booking/:id\`: Get booking by ID
  - \`DELETE /booking/:id\`: Delete booking

## Usage

Once all microservices are up and running, you can interact with them via their respective endpoints.

## API Endpoints

A comprehensive list of all the available API endpoints for each microservice can be found in the documentation provided within each microservice directory.

## Contributing

Contributions are welcome! Please read the [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

---
