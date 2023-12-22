import { MenuBar } from '../MenuBar/MenuBar';
import { OfflineDetector } from '../OfflineDetector/OfflineDetector';
import { nullable } from '../../utils/nullable';

import s from './Main.module.css';
import { useContext } from 'react';
import { pageContext } from '../../context/page';

export const Main: React.FC<React.PropsWithChildren> = ({ children }) => {
    const { globalNetworkStatus, remoteNetworkStatus } = useContext(pageContext);

    return (
        <main className={s.Main}>
            {nullable(!globalNetworkStatus || !remoteNetworkStatus, () => (
                <OfflineDetector global={!globalNetworkStatus} remote={!remoteNetworkStatus} />
            ))}
            <MenuBar />
            {children}
        </main>
    );
};
