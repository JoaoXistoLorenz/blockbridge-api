import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as fs from 'fs';
import * as dotenv from 'dotenv';
dotenv.config();

async function bootstrap() {
  if (process.env.AMBIENDE == 'prod') {
    const app = await NestFactory.create(AppModule, { cors: true });
    await app.listen(3000);
  } else {
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
}
bootstrap();
