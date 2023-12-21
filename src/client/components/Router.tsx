import React, { Suspense, lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';

import { Root } from './Root';
import { ProtectedRoute } from './ProtectedRoute';
import { PublicOnlyRoute } from './PublicOnlyRoute';

const LazySignup = lazy(() => import('../pages/auth/signup'));
const LazySignin = lazy(() => import('../pages/auth/signin'));

const LazyTags = lazy(() => import('../pages/tags'));
const LazyTagsId = lazy(() => import('../pages/tags/[id]'));
const LazyTagsNew = lazy(() => import('../pages/tags/new'));

const LazyError = lazy(() => import('../pages/error'));

// TODO: must be provided via env and support /
const base = '/nosus';

export const paths = {
    index: () => `${base}/`,

    authSignin: () => `${base}/auth/signin`,

    api: () => `${base}/api`,
    apiAuthRefresh: () => `${base}/api/auth.refresh`,
};

const createElementWrapper = (Wrapper: React.FC<React.PropsWithChildren>) => (children: React.ReactNode) => (
    <Wrapper>
        <Suspense fallback="Loading...">{children}</Suspense>
    </Wrapper>
);
const publicOnlyElement = createElementWrapper(PublicOnlyRoute);
const protectedElement = createElementWrapper(ProtectedRoute);

export const routes = createBrowserRouter([
    {
        path: paths.index(),
        element: <Root />,
        errorElement: <LazyError />,
        children: [
            {
                path: 'auth/signup',
                element: publicOnlyElement(<LazySignup />),
            },
            {
                path: 'auth/signin',
                element: publicOnlyElement(<LazySignin />),
            },

            {
                path: 'tags',
                element: protectedElement(<LazyTags />),
            },
            {
                path: 'tags/:id',
                element: protectedElement(<LazyTagsId />),
            },
            {
                path: 'tags/new',
                element: protectedElement(<LazyTagsNew />),
            },
        ],
    },
]);
