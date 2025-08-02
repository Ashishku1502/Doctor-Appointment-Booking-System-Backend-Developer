import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Appointment } from '../../appointments/entities/appointment.entity';

@Entity('doctors')
export class Doctor {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({ description: 'The unique identifier of the doctor' })
  id: string;

  @Column()
  @ApiProperty({ description: 'The name of the doctor' })
  name: string;

  @Column()
  @ApiProperty({ description: 'The specialization of the doctor' })
  specialization: string;

  @Column({ nullable: true })
  @ApiProperty({ description: 'The doctor\'s email address', required: false })
  email: string;

  @Column({ nullable: true })
  @ApiProperty({ description: 'The doctor\'s phone number', required: false })
  phone: string;

  @OneToMany(() => Appointment, appointment => appointment.doctor)
  appointments: Appointment[];
}