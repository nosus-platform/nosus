import { initTRPC, TRPCError } from '@trpc/server';
import passport from 'passport';

import { Context } from './trpcContext';
import { UserSession } from '../database/queries/user';

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
    let user: Awaited<UserSession> | undefined;
    try {
        user = await new Promise<UserSession>((resolve, reject) => {
            passport.authenticate(
                'jwt',
                { session: false },
                (err: any, user: UserSession, info?: { message: string }) => {
                    if (err) reject(err);
                    if (info?.message) reject(new Error(info.message));
                    resolve(user);
                },
            )(req, res);
        });
    } catch (error: any) {
        throw new TRPCError({
            code: 'UNAUTHORIZED',
            message: error.message,
            cause: error,
        });
    }

    return next({
        ctx: { user },
    });
});

export const protectedProcedure = t.procedure.use(jwt);
