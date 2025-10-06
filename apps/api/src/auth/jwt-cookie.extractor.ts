import { Request } from 'express';

export const jwtCookieExtractor = (req: Request): string | null => {
  if (req && req.cookies) {
    const token = req.cookies['auth_token'] as string | undefined;
    return token || null;
  }
  return null;
};
