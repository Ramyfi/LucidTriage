import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { PatientsService } from './patients.service';
import { Patient } from './patient.entity';
import { OpenAIService } from 'src/openai/openai.service';

@Controller('patients')
export class PatientsController {
  constructor(private readonly patientsService: PatientsService, private readonly openaiService: OpenAIService) {}

  @Get()
  getAll(): Promise<Patient[]> {
    return this.patientsService.findAll();
  }

  @Get(':id')
  getOne(@Param('id') id: number): Promise<Patient> {
    return this.patientsService.findOne(id);
  }

  @Post()
  async create(@Body() patient: Partial<Patient>): Promise<Patient> {
    const prompt = `Patient: ${JSON.stringify(patient)}\nSymptoms: ${patient.condition}\nWhat should a nurse consider or do next?`;
    const recommendation = await this.openaiService.chat(prompt)
    const updatedPatient = {
    ...patient,
    recommendation,
  };
  return this.patientsService.create(updatedPatient);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() updateData: Partial<Patient>): Promise<Patient> {
    return this.patientsService.update(id, updateData);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.patientsService.remove(id);
  }
}
