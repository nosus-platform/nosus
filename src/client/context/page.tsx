import { createContext, useEffect, useMemo } from 'react';
import { onlineManager } from '@tanstack/react-query';

import type { UserSession } from '../../server/contract/inferedTypes/user';
import { useOfflineDetector } from '../hooks/useOfflineDetector';

export interface PageContextProps {
    authorized?: boolean;
    user?: UserSession;
    networkStatus?: boolean;
    globalNetworkStatus?: boolean;
    remoteNetworkStatus?: boolean;
}

export const pageContext = createContext<PageContextProps>({});

export const PageContext: React.FC<React.PropsWithChildren> = ({ children }) => {
    const [globalNetworkStatus, remoteNetworkStatus] = useOfflineDetector({
        pollingDelay: 1000,
        remoteServerUrl: '/nosus/health',
    });

    const networkStatus =
        process.env.NODE_ENV === 'development' ? remoteNetworkStatus : globalNetworkStatus && remoteNetworkStatus;

    const context = useMemo<PageContextProps>(
        () => ({
            networkStatus,
            globalNetworkStatus,
            remoteNetworkStatus,
        }),
        [globalNetworkStatus, remoteNetworkStatus],
    );

    useEffect(() => {
        onlineManager.setOnline(networkStatus);
    }, [globalNetworkStatus, remoteNetworkStatus]);

    return <pageContext.Provider value={context}>{children}</pageContext.Provider>;
};
