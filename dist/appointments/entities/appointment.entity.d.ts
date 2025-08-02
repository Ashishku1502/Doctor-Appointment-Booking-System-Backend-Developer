import { Doctor } from '../../doctors/entities/doctor.entity';
export declare class Appointment {
    id: string;
    patientName: string;
    patientEmail: string;
    patientPhone: string;
    startTime: Date;
    endTime: Date;
    notes: string;
    isCancelled: boolean;
    doctor: Doctor;
    doctorId: string;
}
