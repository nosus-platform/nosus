import { useContext } from 'react';

import { nullable } from '../../utils/nullable';
import { pageContext } from '../../context/page';
import { usePageLoading } from '../../hooks/usePageLoading';
import { useHotkeys } from '../../hooks/useHotkeys';
import { NotificationsStack } from '../../hooks/useNotifications';
import { LoadingProgress } from '../LoadingProgress/LoadingProgress';
import { NetworkStatusBar } from '../NetworkStatusBar/NetworkStatusBar';
import { AppSideBar } from '../AppSideBar/AppSideBar';
import { AppMenuBar } from '../AppMenuBar/AppMenuBar';

import s from './App.module.css';

export const App: React.FC<React.PropsWithChildren> = ({ children }) => {
    useHotkeys();

    const { globalNetworkStatus, remoteNetworkStatus } = useContext(pageContext);
    const pageLoadingRef = usePageLoading();

    return (
        <>
            <LoadingProgress ref={pageLoadingRef} />

            {nullable(!globalNetworkStatus || !remoteNetworkStatus, () => (
                <NetworkStatusBar global={!globalNetworkStatus} remote={!remoteNetworkStatus} />
            ))}

            <NotificationsStack />

            <AppMenuBar />

            <main className={s.App}>
                <AppSideBar />

                <div className={s.Outlet}>{children}</div>
            </main>
        </>
    );
};
