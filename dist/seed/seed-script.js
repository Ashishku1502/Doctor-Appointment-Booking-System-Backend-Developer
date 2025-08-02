"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const app_module_1 = require("../app.module");
const doctors_service_1 = require("../doctors/doctors.service");
const appointments_service_1 = require("../appointments/appointments.service");
async function seed() {
    const logger = new common_1.Logger('Seed');
    logger.log('Starting seeding...');
    const app = await core_1.NestFactory.createApplicationContext(app_module_1.AppModule);
    try {
        const doctorsService = app.get(doctors_service_1.DoctorsService);
        const appointmentsService = app.get(appointments_service_1.AppointmentsService);
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
        logger.log('Seeding doctors...');
        const createdDoctors = [];
        for (const doctor of doctors) {
            const createdDoctor = await doctorsService.create(doctor);
            createdDoctors.push(createdDoctor);
            logger.log(`Created doctor: ${createdDoctor.name}`);
        }
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        today.setHours(10, 0, 0, 0);
        tomorrow.setHours(14, 0, 0, 0);
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
        logger.log('Seeding appointments...');
        for (const appointment of appointments) {
            try {
                const createdAppointment = await appointmentsService.create(appointment);
                logger.log(`Created appointment for ${createdAppointment.patientName}`);
            }
            catch (error) {
                logger.error(`Failed to create appointment: ${error.message}`);
            }
        }
        logger.log('Seeding completed successfully!');
    }
    catch (error) {
        logger.error(`Seeding failed: ${error.message}`);
    }
    finally {
        await app.close();
    }
}
seed();
//# sourceMappingURL=seed-script.js.map