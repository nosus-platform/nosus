import type { ViteDevServer } from 'vite';
import express from 'express';

import { config } from './config';
import { createNosusApp } from './nosus';
import { html } from './html';

const app = express();
const nosus = createNosusApp();

if (process.env.NODE_ENV === 'development') {
    require('vite')
        .createServer({
            server: {
                middlewareMode: true,
            },
            appType: 'custom',
        })
        .then((vite: ViteDevServer) => {
            app.use(vite.middlewares);

            nosus.use('*', async (req, res) => {
                try {
                    const htmlString = await vite.transformIndexHtml(
                        req.url,
                        html({
                            themePlaceholder: 'dark',
                            localePlaceholder: req.locale.language,
                            path: './index.html',
                        }),
                    );

                    res.status(200)
                        // ! danger HMR support — dev mode only
                        .header('Content-Security-Policy', "script-src * 'unsafe-inline' 'unsafe-eval'")
                        .set({ 'Content-Type': 'text/html' })
                        .end(htmlString);
                } catch (error) {
                    res.status(500).end(error);
                }
            });

            app.use('/nosus', nosus);

            app.listen(config.port, () => {
                console.log(`http://localhost:${config.port}`);
            });
        });
}

if (process.env.NODE_ENV === 'production') {
    app.use('/nosus', nosus);

    app.listen(config.port, () => {
        console.log(`http://localhost:${config.port}`);
    });
}
