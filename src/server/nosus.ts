import path from 'path';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import cookieSession from 'cookie-session';
import cors from 'cors';
import express, { Router } from 'express';
import morgan from 'morgan';
import createLocaleMiddleware from 'express-locale';
import { createExpressMiddleware } from '@trpc/server/adapters/express';

import { trpcRouter } from './routes';
import { createContext } from './utils/trpcContext';
import { configurePassport } from './passport';
import { html } from './html';

export const createNosusApp = () => {
    const nosus = Router();

    nosus.use(
        cookieSession({
            name: 'session',
            keys: ['openreplay'],
            maxAge: 24 * 60 * 60 * 100,
        }),
    );
    configurePassport(nosus);
    nosus.use(
        cors({
            credentials: true,
        }),
    );
    nosus.use(compression());
    nosus.use(express.urlencoded({ extended: true }));
    nosus.use(express.json());
    nosus.use(cookieParser());
    nosus.use(createLocaleMiddleware());
    nosus.use(morgan('dev'));
    nosus.use(
        '/api',
        createExpressMiddleware({
            router: trpcRouter,
            createContext,
        }),
    );

    nosus.use('/health', (_, res) => {
        res.status(200).end('OK');
    });

    if (process.env.NODE_ENV === 'production') {
        nosus.use(
            express.static(path.resolve(process.cwd(), 'dist/client'), {
                index: false,
            }),
        );
        nosus.use('*', async (req, res) => {
            try {
                res.status(200)
                    .set({ 'Content-Type': 'text/html' })
                    .end(
                        html({
                            // @ts-ignore
                            themePlaceholder: req.user?.settings?.theme || 'dark',
                            path: './dist/client/index.html',
                        }),
                    );
            } catch (error) {
                res.status(500).end(error);
            }
        });
    }

    return nosus;
};
