import { Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { cookies } from '../contract/cookies';

export const encryptPassword = (password: string) => bcrypt.hash(password, 10);

export const comparePassword = (plain: string, hashed: string) => bcrypt.compare(plain, hashed);

export const signTokens = (id: string) => {
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

export const verifyToken = (token: string) => jwt.verify(token, process.env.JWT_SECRET!);

const daysToMs = (days: number) => days * 24 * 60 * 60 * 100;
export const setTokensCookies = (res: Response, tokens: ReturnType<typeof signTokens>) => {
    res.cookie(cookies.authToken, tokens.token, {
        maxAge: daysToMs(tokens.tokenExpDays),
    });

    res.cookie(cookies.refreshToken, tokens.refreshToken, {
        maxAge: daysToMs(tokens.refreshTokenExpDays),
    });
};
