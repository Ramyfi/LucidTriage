import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Patient } from './patient.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class PatientsService {
  constructor(
    @InjectRepository(Patient)
    private patientsRepository: Repository<Patient>,
  ) {}

  findAll(): Promise<Patient[]> {
    return this.patientsRepository.find();
  }

  async findOne(id: number): Promise<Patient> {
      const patient = await this.patientsRepository.findOneBy({ id });
  if (!patient) {
    throw new NotFoundException(`Patient with id ${id} not found`);
  }
  return patient;
  }

  create(patient: Partial<Patient>): Promise<Patient> {
    const newPatient = this.patientsRepository.create(patient);
    return this.patientsRepository.save(newPatient);
  }

  async update(id: number, updateData: Partial<Patient>): Promise<Patient> {
    await this.patientsRepository.update(id, updateData);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.patientsRepository.delete(id);
  }
}
