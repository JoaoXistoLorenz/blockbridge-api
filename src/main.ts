import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as fs from 'fs';

async function bootstrap() {
  /* const app = await NestFactory.create(AppModule, { cors: true });
  await app.listen(3000); */
  const httpsOptions = {
    key: fs.readFileSync('src/secrets/certificate.key'),
    cert: fs.readFileSync('src/secrets/certificate.crt'),
  };
  const app = await NestFactory.create(AppModule, {
    cors: true,
    httpsOptions,
  });
  await app.listen(3000);
}
bootstrap();
