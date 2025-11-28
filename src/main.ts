import 'reflect-metadata';

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Prisma Guard Docker Learn')
    .setDescription('The Prisma Guard Docker Learn API description')
    .setVersion('1.0')
    .addTag('Rest API')
    .addBearerAuth()
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, documentFactory, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  });

  const port = process.env.PORT! || 3000;
  await app.listen(process.env.PORT ?? port);
  console.log(`the server running at http://localhost:${port}/api-docs`);
}
bootstrap();
