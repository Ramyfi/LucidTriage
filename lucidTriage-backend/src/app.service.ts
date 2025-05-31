import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'LucidTriage API is running. Visit /patients to view or add patients.';
  }
}
