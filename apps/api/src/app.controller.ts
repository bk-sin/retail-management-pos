import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  getRootRoute() {
    return { status: 'ok', message: 'API funcionando correctamente!' };
  }
}
