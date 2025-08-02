import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class FilterDoctorDto {
  @ApiProperty({ description: 'Filter doctors by specialization', required: false })
  @IsOptional()
  @IsString()
  specialization?: string;

  @ApiProperty({ description: 'Search doctors by name', required: false })
  @IsOptional()
  @IsString()
  search?: string;
}