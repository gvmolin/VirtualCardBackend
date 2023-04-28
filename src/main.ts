import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv'
import { createDatabase } from 'typeorm-extension';
import { createAllFiles } from './core/utils/fs.utils';

async function bootstrap() {
  createAllFiles()
  dotenv.config()
  await createDatabase({ifNotExist:true}).then(()=>{
    console.log(`------------> DATABASE ${process.env.TYPEORM_DATABASE} CREATED`)
  })
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: process.env.CORS_WHITELIST.split(','),
  });
  await app.listen(process.env.APP_PORT);
  console.log(`------------> APP RUNNING AT PORT ${process.env.APP_PORT}`)
}

bootstrap();

