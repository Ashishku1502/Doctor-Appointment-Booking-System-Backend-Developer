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
exports.AppointmentsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const appointments_service_1 = require("./appointments.service");
const create_appointment_dto_1 = require("./dto/create-appointment.dto");
const update_appointment_dto_1 = require("./dto/update-appointment.dto");
const appointment_entity_1 = require("./entities/appointment.entity");
const available_slots_dto_1 = require("./dto/available-slots.dto");
let AppointmentsController = class AppointmentsController {
    appointmentsService;
    constructor(appointmentsService) {
        this.appointmentsService = appointmentsService;
    }
    create(createAppointmentDto) {
        return this.appointmentsService.create(createAppointmentDto);
    }
    findAll() {
        return this.appointmentsService.findAll();
    }
    findByDoctor(doctorId) {
        return this.appointmentsService.findByDoctor(doctorId);
    }
    getAvailableSlots(doctorId, date) {
        return this.appointmentsService.getAvailableTimeSlots(doctorId, date);
    }
    findOne(id) {
        return this.appointmentsService.findOne(id);
    }
    update(id, updateAppointmentDto) {
        return this.appointmentsService.update(id, updateAppointmentDto);
    }
    remove(id) {
        return this.appointmentsService.remove(id);
    }
};
exports.AppointmentsController = AppointmentsController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new appointment' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'The appointment has been successfully created.', type: appointment_entity_1.Appointment }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Bad Request - Invalid data or time slot already booked.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Doctor not found.' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_appointment_dto_1.CreateAppointmentDto]),
    __metadata("design:returntype", void 0)
], AppointmentsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all appointments' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return all appointments.', type: [appointment_entity_1.Appointment] }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AppointmentsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('doctor/:doctorId'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all appointments for a specific doctor' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return all appointments for the doctor.', type: [appointment_entity_1.Appointment] }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Doctor not found.' }),
    (0, swagger_1.ApiParam)({ name: 'doctorId', description: 'The id of the doctor' }),
    __param(0, (0, common_1.Param)('doctorId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AppointmentsController.prototype, "findByDoctor", null);
__decorate([
    (0, common_1.Get)('available-slots'),
    (0, swagger_1.ApiOperation)({ summary: 'Get available time slots for a doctor on a specific date' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return available time slots.', type: [available_slots_dto_1.TimeSlot] }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Doctor not found.' }),
    (0, swagger_1.ApiQuery)({ name: 'doctorId', required: true, description: 'The id of the doctor' }),
    (0, swagger_1.ApiQuery)({ name: 'date', required: true, description: 'The date to check (ISO format)' }),
    __param(0, (0, common_1.Query)('doctorId')),
    __param(1, (0, common_1.Query)('date')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], AppointmentsController.prototype, "getAvailableSlots", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get an appointment by id' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return the appointment.', type: appointment_entity_1.Appointment }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Appointment not found.' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'The id of the appointment' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AppointmentsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update an appointment' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'The appointment has been successfully updated.', type: appointment_entity_1.Appointment }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Bad Request - Invalid data or time slot already booked.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Appointment not found.' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'The id of the appointment' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_appointment_dto_1.UpdateAppointmentDto]),
    __metadata("design:returntype", void 0)
], AppointmentsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete an appointment' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'The appointment has been successfully deleted.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Appointment not found.' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'The id of the appointment' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AppointmentsController.prototype, "remove", null);
exports.AppointmentsController = AppointmentsController = __decorate([
    (0, swagger_1.ApiTags)('appointments'),
    (0, common_1.Controller)('appointments'),
    __metadata("design:paramtypes", [appointments_service_1.AppointmentsService])
], AppointmentsController);
//# sourceMappingURL=appointments.controller.js.map