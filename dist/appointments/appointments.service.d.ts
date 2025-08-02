import { Repository } from 'typeorm';
import { Appointment } from './entities/appointment.entity';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { DoctorsService } from '../doctors/doctors.service';
import { TimeSlot } from './dto/available-slots.dto';
export declare class AppointmentsService {
    private appointmentsRepository;
    private doctorsService;
    private readonly workingHoursStart;
    private readonly workingHoursEnd;
    private readonly appointmentDuration;
    constructor(appointmentsRepository: Repository<Appointment>, doctorsService: DoctorsService);
    create(createAppointmentDto: CreateAppointmentDto): Promise<Appointment>;
    findAll(): Promise<Appointment[]>;
    findByDoctor(doctorId: string): Promise<Appointment[]>;
    findOne(id: string): Promise<Appointment>;
    update(id: string, updateAppointmentDto: UpdateAppointmentDto): Promise<Appointment>;
    remove(id: string): Promise<void>;
    getAvailableTimeSlots(doctorId: string, date: string): Promise<TimeSlot[]>;
    private checkOverlappingAppointments;
}
