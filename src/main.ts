import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
// NestExpressApplication
async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.useGlobalPipes(new ValidationPipe());
  app
    .listen(3000)
    .then(() => {
      console.log('server is running on port 3000');
    })
    .catch((error) => {
      console.log(error);
    });
}
bootstrap();
