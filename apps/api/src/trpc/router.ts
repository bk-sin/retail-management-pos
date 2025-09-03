import { initTRPC } from '@trpc/server';

export const t = initTRPC.create();

export const appRouter = t.router({
  health: t.procedure.query(() => 'ok'),
});

export type AppRouter = typeof appRouter;
