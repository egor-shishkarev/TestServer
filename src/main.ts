import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app.module';
import { configDotenv } from 'dotenv';
import * as argon2 from 'argon2';

async function bootstrap() {
  configDotenv();
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
  console.log(await argon2.hash("newadmin"));
}
bootstrap();
