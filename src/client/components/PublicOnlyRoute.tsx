import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '../hooks/useAuth';
import { paths } from './Router';

export const PublicOnlyRoute: React.FC<React.PropsWithChildren> = ({ children }) => {
    const navigate = useNavigate();
    const { authorized } = useAuth();

    useEffect(() => {
        if (authorized) {
            navigate(paths.index());
        }
    }, [authorized]);

    return !authorized ? children : null;
};
