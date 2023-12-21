import { Outlet } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';

import { useTrpc } from '../hooks/useTrpc';
import { trpc } from '../utils/trpc';
import { PageContext } from '../context/page';
import { AuthWatcher } from './AuthWatcher';
import { Main } from './Main/Main';
import { Theme } from './Theme';

export const Root = () => {
    const { queryClient, trpcClient } = useTrpc();

    return (
        <trpc.Provider client={trpcClient} queryClient={queryClient}>
            <QueryClientProvider client={queryClient}>
                <AuthWatcher>
                    <PageContext>
                        <Theme>
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
