import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Host } from 'env.config';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      validationError: {
        target: false,
      },
    }),
  );

  await app.listen(Host.port);
}
bootstrap();
