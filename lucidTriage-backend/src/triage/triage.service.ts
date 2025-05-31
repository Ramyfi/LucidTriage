import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TriageLog } from './triage.entity';
import { Patient } from '../patients/patient.entity';
import { OpenAIService } from '../openai/openai.service';

@Injectable()
export class TriageService {
  constructor(
    @InjectRepository(TriageLog) private triageRepo: Repository<TriageLog>,
    @InjectRepository(Patient) private patientRepo: Repository<Patient>,
    private openAIService: OpenAIService
  ) {}

  async analyzeSymptoms(patientId: number, symptoms: string) {
    const patient = await this.patientRepo.findOne({ where: { id: patientId } });
    if (!patient) throw new Error('Patient not found');

    const prompt = `Patient: ${JSON.stringify(patient)}\nSymptoms: ${symptoms}\nWhat should a nurse consider or do next?`;
    const response = await this.openAIService.chat(prompt);

    const log = this.triageRepo.create({ patient, prompt, response });
    await this.triageRepo.save(log);

    return response;
  }

  async getLogs() {
    return this.triageRepo.find({ order: { createdAt: 'DESC' } });
  }
}
