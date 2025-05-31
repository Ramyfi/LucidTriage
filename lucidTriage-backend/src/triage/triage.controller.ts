import { Controller, Post, Body, Get } from '@nestjs/common';
import { OpenAIService } from '../openai/openai.service';
import { PatientsService } from 'src/patients/patients.service';
import { TriageService } from './triage.service';

@Controller('triage')
export class TriageController {
  constructor(private readonly openAIService: OpenAIService, private readonly patientsService: PatientsService, private readonly triageService: TriageService) {}

  @Post()
  async getSuggestions(@Body('symptoms') symptoms: string) {
    const triage = await this.openAIService.chat(symptoms);
    return { triage };
  }

  // triage.controller.ts
@Post('ask')
async askAI(@Body() input: { patientId: number; message: string }) {
  const patient = await this.patientsService.findOne(input.patientId);
  const prompt = `The patient has the following profile:\n${JSON.stringify(patient)}\n\nSymptoms: ${input.message}\n\nWhat should be the next recommended steps?`;
  const advice = await this.openAIService.chat(prompt);
  return { advice };
}

@Get('logs')
async getLogs() {
    return this.triageService.getLogs();
}

}
