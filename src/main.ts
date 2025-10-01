import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  const config = new DocumentBuilder()
    .setTitle('Vehicle Tracking API')
    .setDescription('API for tracking and managing vehicles')
    .setVersion('1.0')
    .addBearerAuth( 
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        in: 'header',
        name: 'Authorization',
        description: 'Masukkan token hasil login (tanpa kata Bearer)',
      }
    )
    .build();
    
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document); 
    
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
