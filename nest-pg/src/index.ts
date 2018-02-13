import { NestFactory } from '@nestjs/core';
import { ApplicationModule } from './app.module';

if (!process.env.PORT) {
  throw new Error('Environment variable PORT is not set');
}

async function bootstrap() {
  const app = await NestFactory.create(ApplicationModule);
  await app.listen(Number(process.env.PORT));
  console.log(`Example app started at port ${process.env.PORT}`);
}

bootstrap();
