import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiQuery } from '@nestjs/swagger';
import { DoctorsService } from './doctors.service';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { FilterDoctorDto } from './dto/filter-doctor.dto';
import { Doctor } from './entities/doctor.entity';

@ApiTags('doctors')
@Controller('doctors')
export class DoctorsController {
  constructor(private readonly doctorsService: DoctorsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new doctor' })
  @ApiResponse({ status: 201, description: 'The doctor has been successfully created.', type: Doctor })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  create(@Body() createDoctorDto: CreateDoctorDto) {
    return this.doctorsService.create(createDoctorDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all doctors with optional filtering' })
  @ApiResponse({ status: 200, description: 'Return all doctors.', type: [Doctor] })
  @ApiQuery({ name: 'specialization', required: false, description: 'Filter by specialization' })
  @ApiQuery({ name: 'search', required: false, description: 'Search by name' })
  findAll(@Query() filterDto: FilterDoctorDto) {
    return this.doctorsService.findAll(filterDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a doctor by id' })
  @ApiResponse({ status: 200, description: 'Return the doctor.', type: Doctor })
  @ApiResponse({ status: 404, description: 'Doctor not found.' })
  @ApiParam({ name: 'id', description: 'The id of the doctor' })
  findOne(@Param('id') id: string) {
    return this.doctorsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a doctor' })
  @ApiResponse({ status: 200, description: 'The doctor has been successfully updated.', type: Doctor })
  @ApiResponse({ status: 404, description: 'Doctor not found.' })
  @ApiParam({ name: 'id', description: 'The id of the doctor' })
  update(@Param('id') id: string, @Body() updateDoctorDto: UpdateDoctorDto) {
    return this.doctorsService.update(id, updateDoctorDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a doctor' })
  @ApiResponse({ status: 200, description: 'The doctor has been successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Doctor not found.' })
  @ApiParam({ name: 'id', description: 'The id of the doctor' })
  remove(@Param('id') id: string) {
    return this.doctorsService.remove(id);
  }
}