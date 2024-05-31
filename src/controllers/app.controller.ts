import { Controller, Get } from '@nestjs/common';
import * as fs from 'fs';

@Controller()
export class AppController {
  @Get()
  async getIndexPage() {
    try {
      const content = fs.readFileSync('src/public/index.html', 'utf8');
      return content;
    } catch (error) {
      console.error('Ошибка при чтении файла:', error);
      return '';
    }
  }
}
