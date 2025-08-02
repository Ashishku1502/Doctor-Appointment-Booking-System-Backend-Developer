import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString } from 'class-validator';

export class UpdateDoctorDto {
  @ApiProperty({ description: 'The name of the doctor', required: false })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({ description: 'The specialization of the doctor', required: false })
  @IsOptional()
  @IsString()
  specialization?: string;

  @ApiProperty({ description: 'The doctor\'s email address', required: false })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiProperty({ description: 'The doctor\'s phone number', required: false })
  @IsOptional()
  @IsString()
  phone?: string;
}