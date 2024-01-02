import { initTRPC } from '@trpc/server';

import { Context } from './trpcContext';
import { authenticate } from '../passport';
import { handleProcedure } from './handleProcedure';

export const t = initTRPC.context<Context>().create();
export const router = t.router;
export const publicProcedure = t.procedure;

/**
 * Why not to use passport middleware before trpc in express app?
 * So, we want to have public and private API routes. Both of them
 * must have zod validation and trpc signature. Because this is much more
 * consistant way to support API. This code could be simpler but this is
 * trade-off for not to support express routes for public API and trpc for private.
 */
const jwt = t.middleware(async ({ next, ctx: { req, res } }) => {
    let user = await handleProcedure(() => authenticate('jwt', req, res))('UNAUTHORIZED');

    return next({
        ctx: { user },
    });
});

export const protectedProcedure = t.procedure.use(jwt);
