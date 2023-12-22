import { Outlet } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';

import { useTrpc } from '../hooks/useTrpc';
import { trpc } from '../utils/trpc';
import { PageContext } from '../context/page';
import { AuthWatcher } from './AuthWatcher';
import { Main } from './Main/Main';
import { Theme } from './Theme';
import { useOfflineDetector } from '../hooks/useOfflineDetector';
import { OfflineDetector } from './OfflineDetector/OfflineDetector';
import { nullable } from '../utils/nullable';

export const Root = () => {
    const { queryClient, trpcClient } = useTrpc();
    const [global, remote] = useOfflineDetector({
        pollingDelay: 1000,
        remoteServerUrl: '/nosus/health',
    });

    return (
        <trpc.Provider client={trpcClient} queryClient={queryClient}>
            <QueryClientProvider client={queryClient}>
                <AuthWatcher>
                    <PageContext>
                        <Theme>
                            {nullable(!global || !remote, () => (
                                <OfflineDetector global={!global} remote={!remote} />
                            ))}

                            <Main>
                                <Outlet />
                            </Main>
                        </Theme>
                    </PageContext>
                </AuthWatcher>
            </QueryClientProvider>
        </trpc.Provider>
    );
};
