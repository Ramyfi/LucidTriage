import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PatientsModule } from './patients/patients.module';
import { OpenAIService } from './openai/openai.service';
import { PatientsService } from './patients/patients.service';
import { ConfigModule } from '@nestjs/config';
import { TriageService } from './triage/triage.service';
import { TriageController } from './triage/triage.controller';
import { PatientsController } from './patients/patients.controller';
import { AppController } from './app.controller';
import { Patient } from './patients/patient.entity';
import { TriageLog } from './triage/triage.entity';
import { AppService } from './app.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost', // your docker host
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'lucidtriage',
      autoLoadEntities: true,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true, // auto sync in dev only
    }),
    TypeOrmModule.forFeature([Patient, TriageLog]),
     ConfigModule.forRoot({
      isGlobal: true, // makes env available throughout the app
    }),
    PatientsModule,
  ],
 controllers:[TriageController, PatientsController, AppController],
 providers:[OpenAIService, PatientsService, TriageService, AppService],
 exports: [OpenAIService, PatientsService, TriageService]

})
export class AppModule {}
