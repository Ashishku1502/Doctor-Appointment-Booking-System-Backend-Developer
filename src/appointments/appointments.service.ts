import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, LessThanOrEqual, MoreThanOrEqual, Repository } from 'typeorm';
import { Appointment } from './entities/appointment.entity';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { DoctorsService } from '../doctors/doctors.service';
import { TimeSlot } from './dto/available-slots.dto';

@Injectable()
export class AppointmentsService {
  // Default working hours (9 AM to 5 PM)
  private readonly workingHoursStart = 9;
  private readonly workingHoursEnd = 17;
  // Default appointment duration in minutes
  private readonly appointmentDuration = 30;

  constructor(
    @InjectRepository(Appointment)
    private appointmentsRepository: Repository<Appointment>,
    private doctorsService: DoctorsService,
  ) {}

  async create(createAppointmentDto: CreateAppointmentDto): Promise<Appointment> {
    // Check if doctor exists
    await this.doctorsService.findOne(createAppointmentDto.doctorId);

    const startTime = new Date(createAppointmentDto.startTime);
    const endTime = new Date(createAppointmentDto.endTime);

    // Validate appointment times
    if (startTime >= endTime) {
      throw new BadRequestException('Start time must be before end time');
    }

    // Check for overlapping appointments
    const overlappingAppointment = await this.checkOverlappingAppointments(
      createAppointmentDto.doctorId,
      startTime,
      endTime,
    );

    if (overlappingAppointment) {
      throw new BadRequestException('The selected time slot is already booked');
    }

    const appointment = this.appointmentsRepository.create({
      ...createAppointmentDto,
      startTime,
      endTime,
    });

    return this.appointmentsRepository.save(appointment);
  }

  async findAll(): Promise<Appointment[]> {
    return this.appointmentsRepository.find({
      relations: ['doctor'],
    });
  }

  async findByDoctor(doctorId: string): Promise<Appointment[]> {
    // Check if doctor exists
    await this.doctorsService.findOne(doctorId);

    return this.appointmentsRepository.find({
      where: { doctorId },
      relations: ['doctor'],
    });
  }

  async findOne(id: string): Promise<Appointment> {
    const appointment = await this.appointmentsRepository.findOne({
      where: { id },
      relations: ['doctor'],
    });

    if (!appointment) {
      throw new NotFoundException(`Appointment with ID ${id} not found`);
    }

    return appointment;
  }

  async update(id: string, updateAppointmentDto: UpdateAppointmentDto): Promise<Appointment> {
    const appointment = await this.findOne(id);

    // Check for time changes that might cause overlaps
    if (updateAppointmentDto.startTime || updateAppointmentDto.endTime) {
      const startTime = updateAppointmentDto.startTime
        ? new Date(updateAppointmentDto.startTime)
        : appointment.startTime;
      const endTime = updateAppointmentDto.endTime
        ? new Date(updateAppointmentDto.endTime)
        : appointment.endTime;

      // Validate appointment times
      if (startTime >= endTime) {
        throw new BadRequestException('Start time must be before end time');
      }

      // Check for overlapping appointments (excluding this appointment)
      const overlappingAppointment = await this.checkOverlappingAppointments(
        appointment.doctorId,
        startTime,
        endTime,
        id,
      );

      if (overlappingAppointment) {
        throw new BadRequestException('The selected time slot is already booked');
      }

      // Update the times
      appointment.startTime = startTime;
      appointment.endTime = endTime;
    }

    // Update other fields
    if (updateAppointmentDto.patientName) appointment.patientName = updateAppointmentDto.patientName;
    if (updateAppointmentDto.patientEmail) appointment.patientEmail = updateAppointmentDto.patientEmail;
    if (updateAppointmentDto.patientPhone) appointment.patientPhone = updateAppointmentDto.patientPhone;
    if (updateAppointmentDto.notes) appointment.notes = updateAppointmentDto.notes;
    if (updateAppointmentDto.isCancelled !== undefined) appointment.isCancelled = updateAppointmentDto.isCancelled;

    return this.appointmentsRepository.save(appointment);
  }

  async remove(id: string): Promise<void> {
    const result = await this.appointmentsRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Appointment with ID ${id} not found`);
    }
  }

  async getAvailableTimeSlots(doctorId: string, date: string): Promise<TimeSlot[]> {
    // Check if doctor exists
    await this.doctorsService.findOne(doctorId);

    const requestedDate = new Date(date);
    requestedDate.setHours(0, 0, 0, 0);

    const nextDay = new Date(requestedDate);
    nextDay.setDate(nextDay.getDate() + 1);

    // Get all appointments for the doctor on the requested date
    const appointments = await this.appointmentsRepository.find({
      where: {
        doctorId,
        startTime: Between(requestedDate, nextDay),
        isCancelled: false,
      },
      order: { startTime: 'ASC' },
    });

    // Generate all possible time slots for the day
    const timeSlots: TimeSlot[] = [];
    const slotDurationMs = this.appointmentDuration * 60 * 1000; // Convert minutes to milliseconds

    for (let hour = this.workingHoursStart; hour < this.workingHoursEnd; hour++) {
      for (let minute = 0; minute < 60; minute += this.appointmentDuration) {
        const slotStart = new Date(requestedDate);
        slotStart.setHours(hour, minute, 0, 0);

        const slotEnd = new Date(slotStart.getTime() + slotDurationMs);

        // Check if this slot overlaps with any existing appointment
        const isAvailable = !appointments.some(
          (appointment) =>
            (slotStart >= appointment.startTime && slotStart < appointment.endTime) ||
            (slotEnd > appointment.startTime && slotEnd <= appointment.endTime) ||
            (slotStart <= appointment.startTime && slotEnd >= appointment.endTime),
        );

        if (isAvailable) {
          timeSlots.push({
            startTime: slotStart,
            endTime: slotEnd,
          });
        }
      }
    }

    return timeSlots;
  }

  private async checkOverlappingAppointments(
    doctorId: string,
    startTime: Date,
    endTime: Date,
    excludeAppointmentId?: string,
  ): Promise<Appointment | null> {
    const query = this.appointmentsRepository
      .createQueryBuilder('appointment')
      .where('appointment.doctorId = :doctorId', { doctorId })
      .andWhere('appointment.isCancelled = :isCancelled', { isCancelled: false })
      .andWhere(
        '(appointment.startTime < :endTime AND appointment.endTime > :startTime)',
        { startTime, endTime },
      );

    if (excludeAppointmentId) {
      query.andWhere('appointment.id != :excludeAppointmentId', { excludeAppointmentId });
    }

    return query.getOne();
  }
}