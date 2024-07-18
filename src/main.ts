import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Cats example')
    .setDescription('The cats API description')
    .setVersion('1.0')
    .addTag('cats')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  //useglobalpipes es para permitir las validaciones en cada controlador
  //el whitelist es para ignorar las propiedades no descritas en las interfaces o dto
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true
  }))

  app.enableCors()

  //colocae process.env.PORT cuando se despliegue la app  
  await app.listen(3000);
}
bootstrap();
