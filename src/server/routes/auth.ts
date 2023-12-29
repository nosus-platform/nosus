import { TRPCError } from '@trpc/server';
import passport from 'passport';

import { signinSchema, signupSchema } from '../contract/schema/auth';
import { publicProcedure, router } from '../utils/trpc';
import * as queries from '../database/queries';
import type { UserSession } from '../database/queries/user';
import { setTokensCookies, signTokens, verifyToken } from '../utils/encrypt';

export const authRouter = router({
    signup: publicProcedure
        .input(signupSchema)
        .mutation(async ({ input: { email, password, theme }, ctx: { res } }) => {
            try {
                const user = await queries.user.create(
                    {
                        email,
                        password,
                    },
                    {
                        theme,
                    },
                );

                const { token, tokenExpDays, refreshToken, refreshTokenExpDays } = signTokens(user.id);

                setTokensCookies(res, {
                    token,
                    tokenExpDays,
                    refreshToken,
                    refreshTokenExpDays,
                });

                return;
            } catch (error: any) {
                throw new TRPCError({
                    code: 'INTERNAL_SERVER_ERROR',
                    message: error.message,
                    cause: error,
                });
            }
        }),
    signin: publicProcedure.input(signinSchema).mutation(async ({ input: { email, password }, ctx: { req, res } }) => {
        // trpc batch data with array
        // originally { '0': { email, password } }
        req.body = { email, password };

        try {
            const user = await new Promise<UserSession>((resolve, reject) => {
                passport.authenticate(
                    'signin',
                    { session: false },
                    (err: any, user: UserSession, info?: { message: string }) => {
                        if (err) reject(err);

                        if (info?.message) reject(new Error(info.message));

                        resolve(user);
                    },
                )(req, res);
            });

            const { token, tokenExpDays, refreshToken, refreshTokenExpDays } = signTokens(user.id);

            setTokensCookies(res, {
                token,
                tokenExpDays,
                refreshToken,
                refreshTokenExpDays,
            });

            return { days: tokenExpDays, token, refreshToken };
        } catch (error: any) {
            throw new TRPCError({
                code: 'UNAUTHORIZED',
                message: error.message,
                cause: error,
            });
        }
    }),
    refresh: publicProcedure.mutation(async ({ ctx: { req, res } }) => {
        try {
            const decoded = verifyToken(req.cookies['_refreshToken']);

            if (typeof decoded !== 'string' && decoded.id) {
                const user = await queries.user.findByIdOrThrow({ id: decoded.id });

                const { token, tokenExpDays, refreshToken, refreshTokenExpDays } = signTokens(user.id);

                setTokensCookies(res, {
                    token,
                    tokenExpDays,
                    refreshToken,
                    refreshTokenExpDays,
                });

                return { token, refreshToken };
            }

            return;
        } catch (error: any) {
            throw new TRPCError({
                code: 'UNAUTHORIZED',
                message: error.message,
                cause: error,
            });
        }
    }),
});
