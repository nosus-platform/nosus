import React from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';

import { routes } from './components/Router';

createRoot(document.getElementById('app')!).render(
    <React.StrictMode>
        <RouterProvider router={routes} />
    </React.StrictMode>,
);
