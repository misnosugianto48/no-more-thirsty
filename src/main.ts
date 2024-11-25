import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { AllExceptionsFilter } from './filters/all-exceptions.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix('api');
  app.useGlobalFilters(new AllExceptionsFilter());

  const config = new DocumentBuilder()
    .setTitle('Api Thirsty')
    .setDescription('the Thirsty API description')
    .setContact(
      'Misno Sugianto',
      'https://misnosugianto48.github.io/misno-sugianto',
      'misno48.sugianto@gmail.com',
    )
    .setVersion('1.0')
    .build();

  const documentary = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentary);

  await app.listen(3000);
}
bootstrap();
