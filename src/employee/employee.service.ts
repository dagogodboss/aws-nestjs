import { InjectModel } from 'nestjs-dynamodb';
import { Employee, EmployeeEntity } from './model/employee';
import { DynamoDB } from 'aws-sdk';
import { QueryIterator } from '@aws/dynamodb-data-mapper';
import {
  CreateEmployeeDTO,
  CreateEmployeeResponse,
  defaultRole,
} from './interface/IEmployee';
import { Injectable } from '@nestjs/common';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectModel(EmployeeEntity)
    private readonly employeeModel: typeof Employee,
  ) {}
  async create(
    employeeDto: CreateEmployeeDTO,
  ): Promise<CreateEmployeeResponse> {
    return this.employeeModel.create({ ...employeeDto, roles: [defaultRole] });
  }

  async all(employeeQuery: any): Promise<QueryIterator<EmployeeEntity>> {
    return this.employeeModel.query(employeeQuery);
  }

  async find(id: string): Promise<EmployeeEntity> {
    return this.employeeModel.find({ pk: id });
  }

  async delete(input: string): Promise<DynamoDB.DeleteItemOutput> {
    return this.employeeModel.delete({ pk: input });
  }

  async update(id: string, item: any): Promise<EmployeeEntity> {
    return this.employeeModel.update({ pk: id }, { item });
  }
}
