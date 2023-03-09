import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { StudentSchema } from './app.schema';
const MONGODB_URL =
  'mongodb+srv://rdev69146:GEMf0Wia0uC0NFGZ@cluster0.kdvbgpe.mongodb.net/?retryWrites=true&w=majority';
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: './config/development.env',
      ignoreEnvFile: true,
      isGlobal: true,
    }),
    MongooseModule.forRoot(MONGODB_URL),
    MongooseModule.forFeature([{ name: 'Student', schema: StudentSchema }]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
