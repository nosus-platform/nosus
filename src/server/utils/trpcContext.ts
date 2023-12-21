import { CreateExpressContextOptions } from '@trpc/server/adapters/express';
import { inferAsyncReturnType } from '@trpc/server';

import { prisma } from './prisma';

export const createContext = ({ req, res }: CreateExpressContextOptions) => ({
    req,
    res,
    prisma,
    locale: req.locale,
});

export type Context = inferAsyncReturnType<typeof createContext>;
