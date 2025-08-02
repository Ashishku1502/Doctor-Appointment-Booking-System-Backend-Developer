import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiQuery } from '@nestjs/swagger';
import { AppointmentsService } from './appointments.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { Appointment } from './entities/appointment.entity';
import { AvailableSlotsDto, TimeSlot } from './dto/available-slots.dto';

@ApiTags('appointments')
@Controller('appointments')
export class AppointmentsController {
  constructor(private readonly appointmentsService: AppointmentsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new appointment' })
  @ApiResponse({ status: 201, description: 'The appointment has been successfully created.', type: Appointment })
  @ApiResponse({ status: 400, description: 'Bad Request - Invalid data or time slot already booked.' })
  @ApiResponse({ status: 404, description: 'Doctor not found.' })
  create(@Body() createAppointmentDto: CreateAppointmentDto) {
    return this.appointmentsService.create(createAppointmentDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all appointments' })
  @ApiResponse({ status: 200, description: 'Return all appointments.', type: [Appointment] })
  findAll() {
    return this.appointmentsService.findAll();
  }

  @Get('doctor/:doctorId')
  @ApiOperation({ summary: 'Get all appointments for a specific doctor' })
  @ApiResponse({ status: 200, description: 'Return all appointments for the doctor.', type: [Appointment] })
  @ApiResponse({ status: 404, description: 'Doctor not found.' })
  @ApiParam({ name: 'doctorId', description: 'The id of the doctor' })
  findByDoctor(@Param('doctorId') doctorId: string) {
    return this.appointmentsService.findByDoctor(doctorId);
  }

  @Get('available-slots')
  @ApiOperation({ summary: 'Get available time slots for a doctor on a specific date' })
  @ApiResponse({ status: 200, description: 'Return available time slots.', type: [TimeSlot] })
  @ApiResponse({ status: 404, description: 'Doctor not found.' })
  @ApiQuery({ name: 'doctorId', required: true, description: 'The id of the doctor' })
  @ApiQuery({ name: 'date', required: true, description: 'The date to check (ISO format)' })
  getAvailableSlots(@Query('doctorId') doctorId: string, @Query('date') date: string) {
    return this.appointmentsService.getAvailableTimeSlots(doctorId, date);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an appointment by id' })
  @ApiResponse({ status: 200, description: 'Return the appointment.', type: Appointment })
  @ApiResponse({ status: 404, description: 'Appointment not found.' })
  @ApiParam({ name: 'id', description: 'The id of the appointment' })
  findOne(@Param('id') id: string) {
    return this.appointmentsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update an appointment' })
  @ApiResponse({ status: 200, description: 'The appointment has been successfully updated.', type: Appointment })
  @ApiResponse({ status: 400, description: 'Bad Request - Invalid data or time slot already booked.' })
  @ApiResponse({ status: 404, description: 'Appointment not found.' })
  @ApiParam({ name: 'id', description: 'The id of the appointment' })
  update(@Param('id') id: string, @Body() updateAppointmentDto: UpdateAppointmentDto) {
    return this.appointmentsService.update(id, updateAppointmentDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an appointment' })
  @ApiResponse({ status: 200, description: 'The appointment has been successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Appointment not found.' })
  @ApiParam({ name: 'id', description: 'The id of the appointment' })
  remove(@Param('id') id: string) {
    return this.appointmentsService.remove(id);
  }
}