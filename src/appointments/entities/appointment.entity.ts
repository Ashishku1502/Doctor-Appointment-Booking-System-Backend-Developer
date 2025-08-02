import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Doctor } from '../../doctors/entities/doctor.entity';

@Entity('appointments')
export class Appointment {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({ description: 'The unique identifier of the appointment' })
  id: string;

  @Column()
  @ApiProperty({ description: 'The patient name' })
  patientName: string;

  @Column()
  @ApiProperty({ description: 'The patient email' })
  patientEmail: string;

  @Column({ nullable: true })
  @ApiProperty({ description: 'The patient phone number', required: false })
  patientPhone: string;

  @Column({ type: 'datetime' })
  @ApiProperty({ description: 'The start time of the appointment' })
  startTime: Date;

  @Column({ type: 'datetime' })
  @ApiProperty({ description: 'The end time of the appointment' })
  endTime: Date;

  @Column({ nullable: true })
  @ApiProperty({ description: 'Notes for the appointment', required: false })
  notes: string;

  @Column({ default: false })
  @ApiProperty({ description: 'Whether the appointment is cancelled' })
  isCancelled: boolean;

  @ManyToOne(() => Doctor, doctor => doctor.appointments)
  @JoinColumn({ name: 'doctorId' })
  doctor: Doctor;

  @Column()
  doctorId: string;
}