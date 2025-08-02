import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateDoctorDto {
  @ApiProperty({ description: 'The name of the doctor' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ description: 'The specialization of the doctor' })
  @IsNotEmpty()
  @IsString()
  specialization: string;

  @ApiProperty({ description: 'The doctor\'s email address', required: false })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiProperty({ description: 'The doctor\'s phone number', required: false })
  @IsOptional()
  @IsString()
  phone?: string;
}