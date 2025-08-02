[README.md](https://github.com/user-attachments/files/21557221/README.md)
# Doctor Appointment Booking System

A NestJS backend application for managing doctor appointments, built with TypeScript, SQLite, and TypeORM.

## Repository

[GitHub Repository](https://github.com/Ashishku1502/Doctor-Appointment-Booking-System-Backend-Developer.git)

## Features

- View list of doctors with filtering by specialization
- View available time slots for a doctor
- Book appointments with validation for overlapping slots
- Swagger API documentation
- Data seeding for testing

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn

## Installation

```bash
# Clone the repository
git clone <repository-url>
cd doctor-appointment-system

# Install dependencies
npm install
```

## Database Configuration

The application is configured to use SQLite for simplicity. The database file will be created automatically in the project root directory.

If you prefer to use PostgreSQL, update the database configuration in `src/config/database.config.ts` or set the following environment variables:

```
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_NAME=doctor_appointment_db
```

## Running the Application

```bash
# Development mode
npm run start:dev

# Production mode
npm run build
npm run start:prod
```

The application will be available at http://localhost:3000

## API Documentation

Swagger documentation is available at http://localhost:3000/api

## Seeding the Database

To populate the database with sample data, first build the application and then run the seed script:

```bash
# Build the application
npm run build

# Run the seed script
node dist/seed/seed-script.js
```

## API Endpoints

### Doctors

- `GET /doctors` - Get all doctors (with optional filtering)
- `GET /doctors/:id` - Get a specific doctor
- `POST /doctors` - Create a new doctor
- `PATCH /doctors/:id` - Update a doctor
- `DELETE /doctors/:id` - Delete a doctor

### Appointments

- `GET /appointments` - Get all appointments
- `GET /appointments/:id` - Get a specific appointment
- `GET /appointments/doctor/:doctorId` - Get all appointments for a doctor
- `GET /appointments/available-slots?doctorId=<id>&date=<date>` - Get available time slots for a doctor on a specific date
- `POST /appointments` - Create a new appointment
- `PATCH /appointments/:id` - Update an appointment
- `DELETE /appointments/:id` - Delete an appointment

## Business Rules

- A doctor cannot be double-booked for the same time slot
- Appointments must not overlap for the same doctor

## Project Structure

```
src/
├── appointments/           # Appointments module
│   ├── dto/                # Data Transfer Objects
│   ├── entities/           # Appointment entity
│   ├── appointments.controller.ts
│   ├── appointments.module.ts
│   └── appointments.service.ts
├── doctors/                # Doctors module
│   ├── dto/                # Data Transfer Objects
│   ├── entities/           # Doctor entity
│   ├── doctors.controller.ts
│   ├── doctors.module.ts
│   └── doctors.service.ts
├── config/                 # Configuration files
├── seed/                   # Database seeding
├── app.module.ts           # Main application module
└── main.ts                 # Application entry point
```

## License

MIT
