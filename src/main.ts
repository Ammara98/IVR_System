import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
require('dotenv').config({ path: '.env' })
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(4000);
}
bootstrap();
