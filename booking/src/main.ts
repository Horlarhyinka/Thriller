import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { appConfig } from './config/config';
import { DocumentBuilder } from '@nestjs/swagger';
import { SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe())

  const swaggerConfig = new DocumentBuilder()
  .setTitle("Thriller Travel's Task Documentation")
  .setDescription("API documentation for bookings microservice")
  .setVersion("1.0")
  .addTag("Thriller")
  .addBearerAuth()
  .build()

  const doc = SwaggerModule.createDocument(app, swaggerConfig)

  SwaggerModule.setup("/apidocs", app, doc)
  await app.listen(appConfig.port);
  console.log("app running on port", appConfig.port)
}
bootstrap();
