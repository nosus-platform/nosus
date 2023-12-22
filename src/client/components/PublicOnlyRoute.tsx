import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { paths } from './Router';
import { pageContext } from '../context/page';
import { nullable } from '../utils/nullable';

export const PublicOnlyRoute: React.FC<React.PropsWithChildren> = ({ children }) => {
    const navigate = useNavigate();
    const { authorized } = useContext(pageContext);

    useEffect(() => {
        if (authorized) {
            navigate(paths.index());
        }
    }, [authorized]);

    return nullable(!authorized, () => children);
};
