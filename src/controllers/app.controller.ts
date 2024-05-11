import { Controller, Get, Body, Post } from '@nestjs/common';
import { AppService } from '../services';
import * as fs from 'fs';
import { AccountDto } from 'src/dto/account.dto';
import { DatabaseService } from '../services';
import * as bcrypt from 'bcrypt';

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
    try {
      const content = fs.readFileSync('src/public/register.html', 'utf8');
      return content;
    } catch (error) {
      console.error('Ошибка при чтении файла:', error);
      return '';
    }
  }

  @Get('/auth')
  async authUser() {
    try {
      const content = fs.readFileSync('src/public/authentication.html', 'utf8');
      return content;
    } catch (error) {
      console.error('Ошибка при чтении файла:', error);
      return '';
    }
  }
  
  @Get('/all')
  async getAllUsers() {
    return await this.databaseService.getAll();
  }
  
  @Post()
  async register(@Body() body: AccountDto) {
    const result = await this.databaseService.add(body);
    if (result) {
      return "User successfully added";
    } else {
      return "User with this login already exists";
    }
  }

  @Post('/check')
  async checkUser(@Body() body: AccountDto) {
    const user = await this.databaseService.getByLogin(body.login);
    if (user) {
      const isMatch = await bcrypt.compare(body.password, user.password);
      return isMatch;
    } else {
      return false;
    }
  }
}
