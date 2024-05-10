import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);

  await new Promise((resolve) => setTimeout(resolve, 5000));
  const response = await fetch('http://localhost:3000/');
  console.log(response);
}
bootstrap();
