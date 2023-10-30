import { Module } from '@nestjs/common';
import { DynamoDBModule } from 'nestjs-dynamodb';
import { EmployeeEntity } from './model/employee';
import { EmployeeService } from './employee.service';
import { EmployeeController } from './employee.controller';

@Module({
  imports: [DynamoDBModule.forFeature([EmployeeEntity])],
  controllers: [EmployeeController],
  providers: [EmployeeService],
  exports: [EmployeeService],
})
export class EmployeeModule {}
