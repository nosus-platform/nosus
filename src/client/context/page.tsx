import { createContext } from 'react';

import { useAuth } from '../hooks/useAuth';
import { trpc } from '../utils/trpc';
import type { UserSession } from '../../server/contract/inferedTypes/user';

interface PageContextProps {
    user?: UserSession;
}

export const pageContext = createContext<PageContextProps>({});

export const PageContext: React.FC<React.PropsWithChildren> = ({ children }) => {
    const { authorized } = useAuth();
    const { data: user } = trpc.user.session.useQuery(undefined, {
        enabled: authorized,
        staleTime: 0,
        cacheTime: 0,
        refetchOnReconnect: true,
        refetchOnWindowFocus: true,
    });

    return <pageContext.Provider value={{ user }}>{children}</pageContext.Provider>;
};
