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

  @Get('/page1')
  async getFirstPage() {
    try {
      const content = fs.readFileSync('src/public/page1.html', 'utf8');
      return content;
    } catch (error) {
      console.error('Ошибка при чтении файла:', error);
      return '';
    }
  }

  @Get('/page2')
  async getSecondPage() {
    try {
      const content = fs.readFileSync('src/public/page2.html', 'utf8');
      return content;
    } catch (error) {
      console.error('Ошибка при чтении файла:', error);
      return '';
    }
  }
}
