import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '../hooks/useAuth';
import { trpc } from '../utils/trpc';
import { paths } from './Router';

export const AuthWatcher: React.FC<React.PropsWithChildren> = ({ children }) => {
    const navigate = useNavigate();
    const { token, refreshToken, updateToken } = useAuth();
    const [inUpdate, setInUpdate] = useState(false);

    const authRefreshMutation = trpc.auth.refresh.useMutation();

    useEffect(() => {
        if (refreshToken && !token && !inUpdate) {
            (async () => {
                setInUpdate(true);
                const data = await authRefreshMutation.mutateAsync();
                if (data) {
                    updateToken(data.token);
                    setInUpdate(false);
                } else {
                    navigate(paths.authSignin());
                }
            })();
        }
    }, [authRefreshMutation, token, inUpdate]);

    return children;
};
