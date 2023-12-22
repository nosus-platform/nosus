import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { paths } from './Router';
import { App } from './App/App';
import { pageContext } from '../context/page';
import { useAuth } from '../hooks/useAuth';
import { nullable } from '../utils/nullable';

export const ProtectedRoute: React.FC<React.PropsWithChildren> = ({ children }) => {
    const navigate = useNavigate();
    const { refreshToken } = useAuth();
    const { authorized } = useContext(pageContext);

    useEffect(() => {
        if (!authorized && !refreshToken) {
            navigate(paths.authSignin());
        }
    }, [authorized]);

    return nullable(authorized, () => <App>{children}</App>);
};
