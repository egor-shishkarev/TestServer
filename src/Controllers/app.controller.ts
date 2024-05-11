import { Controller, Get, Body, Post } from '@nestjs/common';
import { AppService } from '../services';
import * as fs from 'fs';
import { AccountDto } from 'src/dto/account.dto';
import { DatabaseService } from '../services';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService,
    private readonly databaseService: DatabaseService,
  ) {}

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

  @Get('/register') 
  async registerUser() {
    // Здесь будет отправляться форма для регистрации
  }
  
  @Get('/all')
  async getAllUsers() {
    return await this.databaseService.getAll();
  }
  
  @Post()
  async register(@Body() body: AccountDto) {
    await this.databaseService.add(body);
  }
}
