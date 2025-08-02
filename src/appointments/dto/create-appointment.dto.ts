import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsEmail, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateAppointmentDto {
  @ApiProperty({ description: 'The patient name' })
  @IsNotEmpty()
  @IsString()
  patientName: string;

  @ApiProperty({ description: 'The patient email' })
  @IsNotEmpty()
  @IsEmail()
  patientEmail: string;

  @ApiProperty({ description: 'The patient phone number', required: false })
  @IsOptional()
  @IsString()
  patientPhone?: string;

  @ApiProperty({ description: 'The start time of the appointment (ISO format)' })
  @IsNotEmpty()
  @IsDateString()
  startTime: string;

  @ApiProperty({ description: 'The end time of the appointment (ISO format)' })
  @IsNotEmpty()
  @IsDateString()
  endTime: string;

  @ApiProperty({ description: 'Notes for the appointment', required: false })
  @IsOptional()
  @IsString()
  notes?: string;

  @ApiProperty({ description: 'The doctor ID' })
  @IsNotEmpty()
  @IsUUID()
  doctorId: string;
}