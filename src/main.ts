import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import * as dotenv from 'dotenv';

async function bootstrap() {
  if (process.env.NODE_ENV === 'development') {
    dotenv.config({ path: '.env.local' });
  } // Load .env.local file
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(3000);
}
bootstrap();
