import { Controller, Get } from '@nestjs/common';
import { IsPublic } from './auth/decorators';

@Controller()
export class AppController {
  @IsPublic()
  @Get()
  getRootRoute() {
    return { status: 'ok', message: 'API funcionando correctamente!' };
  }

  @IsPublic()
  @Get('health')
  getHealth() {
    return { status: 'ok' };
  }
}
