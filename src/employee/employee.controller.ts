import { Controller, Delete, Get, Param, Post, Put, Req } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { CreateEmployeeDTO } from './interface/IEmployee';
import { EmployeeEntity } from './model/employee';
import { Request } from 'express';

@Controller('employee')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}
  @Post('')
  create(createEmployeeDTO: CreateEmployeeDTO) {
    this.employeeService.create(createEmployeeDTO);
  }

  @Get('')
  async employees(@Req() { query }: Request): Promise<any> {
    return await this.employeeService.all(query);
  }

  @Get('/:id')
  async employee(@Param('id') id: string): Promise<EmployeeEntity> {
    return await this.employeeService.find(id);
  }

  @Put('/:id')
  async update(
    @Param('id') id: string,
    updateDTO: CreateEmployeeDTO,
  ): Promise<EmployeeEntity> {
    return await this.employeeService.update(id, updateDTO);
  }

  @Delete('/:id')
  async delete(@Param('id') id: string): Promise<any> {
    return await this.employeeService.delete(id);
  }
}
