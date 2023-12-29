import React, { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';

import { protectedElement, publicElement } from './route';
import { routes } from '../../hooks/useRouter';

const LazyIndex = lazy(() => import('../index'));

const LazySignup = lazy(() => import('../auth/signup'));
const LazySignin = lazy(() => import('../auth/signin'));

const LazyTags = lazy(() => import('../tags'));
const LazyTagsId = lazy(() => import('../tags/[id]'));
const LazyTagsNew = lazy(() => import('../tags/new'));

const LazyError = lazy(() => import('../error'));

const errorElement = <LazyError />;

export const schema = createBrowserRouter([
    {
        path: routes.index(),
        element: protectedElement(<LazyIndex />),
        errorElement,
    },
    {
        path: routes.tags(),
        element: protectedElement(<LazyTags />),
        errorElement,
    },
    {
        path: routes.tagsId(':id'),
        element: protectedElement(<LazyTagsId />),
        errorElement,
    },
    {
        path: routes.tagsNew(),
        element: protectedElement(<LazyTagsNew />),
        errorElement,
    },
    {
        path: routes.authSignup(),
        element: publicElement(<LazySignup />),
    },
    {
        path: routes.authSignin(),
        element: publicElement(<LazySignin />),
    },
]);
