import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // serializer
  app.useGlobalPipes(new ValidationPipe());
  // Ws broken if down line not commented TODO!
  // app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  // cookie
  app.use(cookieParser());

  // swagger
  const config = new DocumentBuilder()
    .setTitle('Buylist')
    .setDescription('API description')
    .setVersion('1.0')
    .addTag('buylist')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
// runInCluster(bootstrap) -> on Windows
bootstrap();
