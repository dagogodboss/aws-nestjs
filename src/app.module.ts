import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DynamoDBModule } from 'nestjs-dynamodb';
import { EmployeeModule } from './employee/employee.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [
    DynamoDBModule.forRoot({
      AWSConfig: {},
      dynamoDBOptions: {},
    }),
    EmployeeModule,
    JwtModule.register({
      secret: '!@HDUE@INJKDNW@djfewr9ewr3e09r34h5rhded:JI#*',
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
