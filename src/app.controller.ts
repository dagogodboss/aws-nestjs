import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthUserResponse } from './employee/interface/IEmployee';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/home')
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('/login')
  login(@Body() userLogin: any): Promise<AuthUserResponse> {
    return this.appService.login(userLogin);
  }
}
