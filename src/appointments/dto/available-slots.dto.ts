import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty, IsUUID } from 'class-validator';

export class AvailableSlotsDto {
  @ApiProperty({ description: 'The doctor ID' })
  @IsNotEmpty()
  @IsUUID()
  doctorId: string;

  @ApiProperty({ description: 'The date to check for available slots (ISO format)' })
  @IsNotEmpty()
  @IsDateString()
  date: string;
}

export class TimeSlot {
  @ApiProperty({ description: 'The start time of the slot' })
  startTime: Date;

  @ApiProperty({ description: 'The end time of the slot' })
  endTime: Date;
}