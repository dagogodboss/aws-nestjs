import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DynamoDBModule } from 'nestjs-dynamodb';
import { EmployeeModule } from './employee/employee.module';
@Module({
  imports: [
    DynamoDBModule.forRoot({
      AWSConfig: {},
      dynamoDBOptions: {},
    }),
    EmployeeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
