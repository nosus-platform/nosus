import { TRPCError } from '@trpc/server';
import type { Response } from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';

import { signinSchema, signupSchema } from '../contract/schema/auth';
import { publicProcedure, router } from '../utils/trpc';
import * as queries from '../database/queries';
import type { UserSession } from '../database/queries/user';

const daysToMs = (days: number) => days * 24 * 60 * 60 * 100;

const signTokens = (id: string) => {
    const tokenExpDays = Number(process.env.JWT_EXP_DAYS || 1);
    const token = jwt.sign({ id }, process.env.JWT_SECRET!, {
        expiresIn: `${tokenExpDays}d`,
    });

    const refreshTokenExpDays = Number(process.env.JWT_REFRESH_EXP_DAYS || 7);
    const refreshToken = jwt.sign({ id }, process.env.JWT_SECRET!, {
        expiresIn: `${refreshTokenExpDays}d`,
    });

    return { token, tokenExpDays, refreshToken, refreshTokenExpDays };
};

const setTokensCookies = (
    res: Response,
    { token, tokenExpDays, refreshToken, refreshTokenExpDays }: ReturnType<typeof signTokens>,
) => {
    res.cookie('_authToken', token, {
        maxAge: daysToMs(tokenExpDays),
    });

    res.cookie('_refreshToken', refreshToken, {
        maxAge: daysToMs(refreshTokenExpDays),
    });
};

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
                code: 'INTERNAL_SERVER_ERROR',
                message: error.message,
                cause: error,
            });
        }
    }),
    refresh: publicProcedure.mutation(async ({ ctx: { req, res } }) => {
        try {
            const decoded = jwt.verify(req.cookies['_refreshToken'], process.env.JWT_SECRET!);

            if (typeof decoded !== 'string' && decoded.id) {
                const user = await queries.user.findByOrThrow({ id: decoded.id });

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
