import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import {
  DatabaseExceptionFilter,
  HttpExceptionFilter,
} from './core/utils/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS with custom options
  app.enableCors({
    origin: '*',
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
    credentials: true,
  });

  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  app.setGlobalPrefix('api');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalFilters(new DatabaseExceptionFilter());

  const config = new DocumentBuilder()
    .setTitle('PetHub API')
    .setDescription('The pets hub API docs')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        in: 'Header',
        name: 'Authorization',
      },
      'bearer',
    )
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, documentFactory, {
    swaggerOptions: {
      persistAuthorization: true, // 👈 This line makes auth persist on reload
    },
  });

  await app.listen(process.env.APP_PORT || 3000);
}

bootstrap();
