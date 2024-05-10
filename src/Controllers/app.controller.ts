import { Controller, Get } from '@nestjs/common';
import { AppService } from '../Services/app.service';
import * as fs from 'fs';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getFrontend() {
    try {
      const content = fs.readFileSync('src/public/index.html', 'utf8');
      return content;
    } catch (error) {
      console.error('Ошибка при чтении файла:', error);
      return '';
    }
  }
}
