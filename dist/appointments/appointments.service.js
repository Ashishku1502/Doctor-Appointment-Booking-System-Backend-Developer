"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppointmentsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const appointment_entity_1 = require("./entities/appointment.entity");
const doctors_service_1 = require("../doctors/doctors.service");
let AppointmentsService = class AppointmentsService {
    appointmentsRepository;
    doctorsService;
    workingHoursStart = 9;
    workingHoursEnd = 17;
    appointmentDuration = 30;
    constructor(appointmentsRepository, doctorsService) {
        this.appointmentsRepository = appointmentsRepository;
        this.doctorsService = doctorsService;
    }
    async create(createAppointmentDto) {
        await this.doctorsService.findOne(createAppointmentDto.doctorId);
        const startTime = new Date(createAppointmentDto.startTime);
        const endTime = new Date(createAppointmentDto.endTime);
        if (startTime >= endTime) {
            throw new common_1.BadRequestException('Start time must be before end time');
        }
        const overlappingAppointment = await this.checkOverlappingAppointments(createAppointmentDto.doctorId, startTime, endTime);
        if (overlappingAppointment) {
            throw new common_1.BadRequestException('The selected time slot is already booked');
        }
        const appointment = this.appointmentsRepository.create({
            ...createAppointmentDto,
            startTime,
            endTime,
        });
        return this.appointmentsRepository.save(appointment);
    }
    async findAll() {
        return this.appointmentsRepository.find({
            relations: ['doctor'],
        });
    }
    async findByDoctor(doctorId) {
        await this.doctorsService.findOne(doctorId);
        return this.appointmentsRepository.find({
            where: { doctorId },
            relations: ['doctor'],
        });
    }
    async findOne(id) {
        const appointment = await this.appointmentsRepository.findOne({
            where: { id },
            relations: ['doctor'],
        });
        if (!appointment) {
            throw new common_1.NotFoundException(`Appointment with ID ${id} not found`);
        }
        return appointment;
    }
    async update(id, updateAppointmentDto) {
        const appointment = await this.findOne(id);
        if (updateAppointmentDto.startTime || updateAppointmentDto.endTime) {
            const startTime = updateAppointmentDto.startTime
                ? new Date(updateAppointmentDto.startTime)
                : appointment.startTime;
            const endTime = updateAppointmentDto.endTime
                ? new Date(updateAppointmentDto.endTime)
                : appointment.endTime;
            if (startTime >= endTime) {
                throw new common_1.BadRequestException('Start time must be before end time');
            }
            const overlappingAppointment = await this.checkOverlappingAppointments(appointment.doctorId, startTime, endTime, id);
            if (overlappingAppointment) {
                throw new common_1.BadRequestException('The selected time slot is already booked');
            }
            appointment.startTime = startTime;
            appointment.endTime = endTime;
        }
        if (updateAppointmentDto.patientName)
            appointment.patientName = updateAppointmentDto.patientName;
        if (updateAppointmentDto.patientEmail)
            appointment.patientEmail = updateAppointmentDto.patientEmail;
        if (updateAppointmentDto.patientPhone)
            appointment.patientPhone = updateAppointmentDto.patientPhone;
        if (updateAppointmentDto.notes)
            appointment.notes = updateAppointmentDto.notes;
        if (updateAppointmentDto.isCancelled !== undefined)
            appointment.isCancelled = updateAppointmentDto.isCancelled;
        return this.appointmentsRepository.save(appointment);
    }
    async remove(id) {
        const result = await this.appointmentsRepository.delete(id);
        if (result.affected === 0) {
            throw new common_1.NotFoundException(`Appointment with ID ${id} not found`);
        }
    }
    async getAvailableTimeSlots(doctorId, date) {
        await this.doctorsService.findOne(doctorId);
        const requestedDate = new Date(date);
        requestedDate.setHours(0, 0, 0, 0);
        const nextDay = new Date(requestedDate);
        nextDay.setDate(nextDay.getDate() + 1);
        const appointments = await this.appointmentsRepository.find({
            where: {
                doctorId,
                startTime: (0, typeorm_2.Between)(requestedDate, nextDay),
                isCancelled: false,
            },
            order: { startTime: 'ASC' },
        });
        const timeSlots = [];
        const slotDurationMs = this.appointmentDuration * 60 * 1000;
        for (let hour = this.workingHoursStart; hour < this.workingHoursEnd; hour++) {
            for (let minute = 0; minute < 60; minute += this.appointmentDuration) {
                const slotStart = new Date(requestedDate);
                slotStart.setHours(hour, minute, 0, 0);
                const slotEnd = new Date(slotStart.getTime() + slotDurationMs);
                const isAvailable = !appointments.some((appointment) => (slotStart >= appointment.startTime && slotStart < appointment.endTime) ||
                    (slotEnd > appointment.startTime && slotEnd <= appointment.endTime) ||
                    (slotStart <= appointment.startTime && slotEnd >= appointment.endTime));
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
    async checkOverlappingAppointments(doctorId, startTime, endTime, excludeAppointmentId) {
        const query = this.appointmentsRepository
            .createQueryBuilder('appointment')
            .where('appointment.doctorId = :doctorId', { doctorId })
            .andWhere('appointment.isCancelled = :isCancelled', { isCancelled: false })
            .andWhere('(appointment.startTime < :endTime AND appointment.endTime > :startTime)', { startTime, endTime });
        if (excludeAppointmentId) {
            query.andWhere('appointment.id != :excludeAppointmentId', { excludeAppointmentId });
        }
        return query.getOne();
    }
};
exports.AppointmentsService = AppointmentsService;
exports.AppointmentsService = AppointmentsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(appointment_entity_1.Appointment)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        doctors_service_1.DoctorsService])
], AppointmentsService);
//# sourceMappingURL=appointments.service.js.map