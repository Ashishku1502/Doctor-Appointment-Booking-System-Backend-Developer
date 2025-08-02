import { Appointment } from '../../appointments/entities/appointment.entity';
export declare class Doctor {
    id: string;
    name: string;
    specialization: string;
    email: string;
    phone: string;
    appointments: Appointment[];
}
