import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '../hooks/useAuth';
import { paths } from './Router';
import { App } from './App/App';

export const ProtectedRoute: React.FC<React.PropsWithChildren> = ({ children }) => {
    const navigate = useNavigate();
    const { authorized } = useAuth();

    useEffect(() => {
        if (!authorized) {
            navigate(paths.authSignin());
        }
    }, [authorized]);

    return authorized ? <App>{children}</App> : null;
};
