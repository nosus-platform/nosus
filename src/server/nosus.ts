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
import { html } from './utils/html';
import { cookies } from './contract/cookies';
import { daysToMs } from './utils/date';
import * as queries from './database/queries';
import { routes } from './contract/routes';

interface NosusAppProps {
    mountPath?: string;
}

export const createNosusApp = ({ mountPath }: NosusAppProps) => {
    const nosus = Router();

    nosus.use(
        cookieSession({
            name: 'session',
            keys: ['openreplay'],
            maxAge: daysToMs(1),
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

    nosus.use('/health', (_req, res) => {
        res.status(200).end('Ok');
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
                            // @ts-ignore express do not satisfy resolved user
                            themePlaceholder: req.user?.theme || 'dark',
                            localePlaceholder: req.locale.language,
                            mountPathPlaceholder: mountPath,
                            path: './dist/client/index.html',
                        }),
                    );
            } catch (error) {
                res.status(500).end(error);
            }
        });
    }

    nosus.use([routes.authSignin(''), routes.authSignup(''), routes.authBootstrap('')], async (req, res, next) => {
        const count = await queries.user.count();

        if (count === 0) {
            res.cookie(cookies.firstVisit, true, {
                maxAge: daysToMs(1),
            });

            if (!req.baseUrl.endsWith(routes.authBootstrap())) {
                res.redirect(routes.authBootstrap());
            } else {
                next();
            }
        } else {
            next();
        }
    });

    return nosus;
};
