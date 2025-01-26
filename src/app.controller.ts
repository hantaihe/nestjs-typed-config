import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { EnvironmentVariables } from './config/configuration';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getEnv(): EnvironmentVariables {
    return this.appService.getEnv();
  }
}
