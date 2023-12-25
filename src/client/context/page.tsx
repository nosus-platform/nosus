import { createContext, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '../hooks/useAuth';
import { trpc } from '../utils/trpc';
import type { UserSession } from '../../server/contract/inferedTypes/user';
import { useOfflineDetector } from '../hooks/useOfflineDetector';
import { paths } from '../components/Router';

interface PageContextProps {
    authorized?: boolean;
    user?: UserSession;
    globalNetworkStatus?: boolean;
    remoteNetworkStatus?: boolean;
}

export const pageContext = createContext<PageContextProps>({});

export const PageContext: React.FC<React.PropsWithChildren> = ({ children }) => {
    const navigate = useNavigate();
    const { authorized, token, refreshToken, updateTokens } = useAuth();
    const authRefreshMutation = trpc.auth.refresh.useMutation();
    const [global, remote] = useOfflineDetector({
        pollingDelay: 1000,
        remoteServerUrl: '/nosus/health',
    });
    const networkStatus = process.env.NODE_ENV === 'development' ? remote : global && remote;
    const { data: user } = trpc.user.session.useQuery(undefined, {
        enabled: authorized && networkStatus,
        staleTime: 0,
        cacheTime: 0,
        refetchOnReconnect: networkStatus,
        refetchOnWindowFocus: networkStatus,
    });
    const context = useMemo<PageContextProps>(
        () => ({
            authorized: authRefreshMutation.isLoading ? true : authorized,
            user,
            globalNetworkStatus: global,
            remoteNetworkStatus: remote,
        }),
        [user, global, remote, authRefreshMutation.isLoading, authorized],
    );

    useEffect(() => {
        if (networkStatus && refreshToken && !token && !authRefreshMutation.isLoading) {
            (async () => {
                const data = await authRefreshMutation.mutateAsync(undefined);

                data ? updateTokens(data.token, data.refreshToken) : navigate(paths.authSignin());
            })();
        }
    }, [networkStatus, authRefreshMutation, token]);

    return <pageContext.Provider value={context}>{children}</pageContext.Provider>;
};
