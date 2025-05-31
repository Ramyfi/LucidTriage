import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PatientsService } from './patients.service';
import { PatientsController } from './patients.controller';
import { Patient } from './patient.entity';
import { OpenAIService } from 'src/openai/openai.service';

@Module({
  imports: [TypeOrmModule.forFeature([Patient])],
  providers: [PatientsService, OpenAIService],
  controllers: [PatientsController],
})
export class PatientsModule {}
