import type { ViteDevServer } from 'vite';
import express from 'express';

import { createNosusApp } from './nosus';
import { html } from './utils/html';

const dotEnv = process.env.NODE_ENV !== 'production' ? require('dotenv') : null;

if (dotEnv) dotEnv.config();

const app = express();
const mountPath = process.env.MOUNT_PATH || '/nosus';
const nosus = createNosusApp({
    mountPath: process.env.NODE_ENV === 'production' ? mountPath : '',
});
const run = (port = process.env.PORT || 3000) => {
    app.use(mountPath, nosus);

    app.listen(port, () => {
        console.log(`http://localhost:${port}`);
    });
}

if (process.env.NODE_ENV === 'production') run();

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

            run();
        });
}
