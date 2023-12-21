import { useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

import { useCookie } from './useCookie';
import { paths } from '../components/Router';

export const useAuth = () => {
    const navigate = useNavigate();
    const {
        value: authTokenCookie,
        updateCookie: updateToken,
        deleteCookie: deleteToken,
    } = useCookie('_authToken', 1000);
    const { value: refreshTokenCookie, deleteCookie: deleteRefreshToken } = useCookie('_refreshToken');
    const userId = useMemo(() => {
        if (authTokenCookie) {
            const base64Url = authTokenCookie.split('.')[1];
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            const jsonPayload = decodeURIComponent(
                window
                    .atob(base64)
                    .split('')
                    .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
                    .join(''),
            );

            const payload: { id: string } = JSON.parse(jsonPayload);

            return payload.id;
        }

        return undefined;
    }, [authTokenCookie]);

    const signout = useCallback(() => {
        deleteToken();
        deleteRefreshToken();
        navigate(paths.authSignin());
    }, [deleteToken, deleteRefreshToken]);

    return {
        token: authTokenCookie,
        refreshToken: refreshTokenCookie,
        authorized: Boolean(authTokenCookie),
        id: userId,
        updateToken,
        signout,
    };
};
