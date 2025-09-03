import { Controller, All, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { ApiExcludeController } from '@nestjs/swagger';
import { fetchRequestHandler } from '@trpc/server/adapters/fetch';
import { appRouter } from './router';
import { IsPublic } from '../auth/decorators';

@ApiExcludeController()
@Controller('trpc')
export class TrpcController {
  @IsPublic()
  @All('*')
  async handle(@Req() req: Request, @Res() res: Response): Promise<void> {
    const url = `${req.protocol}://${req.get('host')}${req.originalUrl}`;

    const response = await fetchRequestHandler({
      endpoint: '/trpc',
      req: new globalThis.Request(url, {
        method: req.method,
        headers: req.headers as Record<string, string>,
        body:
          req.method !== 'GET' && req.method !== 'HEAD'
            ? JSON.stringify(req.body)
            : undefined,
      }),
      router: appRouter,
      createContext: () => ({}),
    });

    res.status(response.status);
    response.headers.forEach((value, key) => {
      res.setHeader(key, value);
    });

    const body = await response.text();
    res.send(body);
  }
}
