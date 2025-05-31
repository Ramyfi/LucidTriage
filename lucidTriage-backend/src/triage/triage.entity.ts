import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne } from 'typeorm';
import { Patient } from '../patients/patient.entity';

@Entity()
export class TriageLog {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Patient, { eager: true })
  patient: Patient;

  @Column()
  prompt: string;

  @Column()
  response: string;

  @CreateDateColumn()
  createdAt: Date;
}
