import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsDateString, IsEmail, IsOptional, IsString } from 'class-validator';

export class UpdateAppointmentDto {
  @ApiProperty({ description: 'The patient name', required: false })
  @IsOptional()
  @IsString()
  patientName?: string;

  @ApiProperty({ description: 'The patient email', required: false })
  @IsOptional()
  @IsEmail()
  patientEmail?: string;

  @ApiProperty({ description: 'The patient phone number', required: false })
  @IsOptional()
  @IsString()
  patientPhone?: string;

  @ApiProperty({ description: 'The start time of the appointment (ISO format)', required: false })
  @IsOptional()
  @IsDateString()
  startTime?: string;

  @ApiProperty({ description: 'The end time of the appointment (ISO format)', required: false })
  @IsOptional()
  @IsDateString()
  endTime?: string;

  @ApiProperty({ description: 'Notes for the appointment', required: false })
  @IsOptional()
  @IsString()
  notes?: string;

  @ApiProperty({ description: 'Whether the appointment is cancelled', required: false })
  @IsOptional()
  @IsBoolean()
  isCancelled?: boolean;
}