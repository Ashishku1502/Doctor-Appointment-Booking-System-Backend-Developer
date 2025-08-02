import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { DoctorsService } from '../doctors/doctors.service';
import { AppointmentsService } from '../appointments/appointments.service';
import { Doctor } from '../doctors/entities/doctor.entity';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);

  const doctorsService = app.get(DoctorsService);
  const appointmentsService = app.get(AppointmentsService);

  // Create doctors
  const doctors = [
    {
      name: 'Dr. John Smith',
      specialization: 'Cardiology',
      email: 'john.smith@example.com',
      phone: '+1234567890',
    },
    {
      name: 'Dr. Sarah Johnson',
      specialization: 'Neurology',
      email: 'sarah.johnson@example.com',
      phone: '+1987654321',
    },
    {
      name: 'Dr. Michael Brown',
      specialization: 'Pediatrics',
      email: 'michael.brown@example.com',
      phone: '+1122334455',
    },
    {
      name: 'Dr. Emily Davis',
      specialization: 'Dermatology',
      email: 'emily.davis@example.com',
      phone: '+1555666777',
    },
    {
      name: 'Dr. Robert Wilson',
      specialization: 'Orthopedics',
      email: 'robert.wilson@example.com',
      phone: '+1999888777',
    },
  ];

  console.log('Seeding doctors...');
  const createdDoctors: Doctor[] = [];
  for (const doctor of doctors) {
    const createdDoctor = await doctorsService.create(doctor);
    createdDoctors.push(createdDoctor);
    console.log(`Created doctor: ${createdDoctor.name}`);
  }

  // Create some sample appointments
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  // Set hours for appointments
  today.setHours(10, 0, 0, 0); // 10:00 AM
  tomorrow.setHours(14, 0, 0, 0); // 2:00 PM

  const appointments = [
    {
      patientName: 'Alice Johnson',
      patientEmail: 'alice@example.com',
      patientPhone: '+1111222333',
      startTime: new Date(today).toISOString(),
      endTime: new Date(new Date(today).setMinutes(today.getMinutes() + 30)).toISOString(),
      notes: 'Regular checkup',
      doctorId: createdDoctors[0].id,
    },
    {
      patientName: 'Bob Smith',
      patientEmail: 'bob@example.com',
      patientPhone: '+1444555666',
      startTime: new Date(tomorrow).toISOString(),
      endTime: new Date(new Date(tomorrow).setMinutes(tomorrow.getMinutes() + 45)).toISOString(),
      notes: 'Follow-up appointment',
      doctorId: createdDoctors[1].id,
    },
  ];

  console.log('Seeding appointments...');
  for (const appointment of appointments) {
    try {
      const createdAppointment = await appointmentsService.create(appointment);
      console.log(`Created appointment for ${createdAppointment.patientName}`);
    } catch (error) {
      console.error(`Failed to create appointment: ${error.message}`);
    }
  }

  console.log('Seeding completed!');
  await app.close();
}

bootstrap();