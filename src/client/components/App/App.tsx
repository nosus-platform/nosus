import { PageLoadingProgress } from '../PageLoadingProgress/PageLoadingProgress';
import { SideBar } from '../SideBar/SideBar';

import s from './App.module.css';
import { usePageLoading } from '../../hooks/usePageLoading';

export const App: React.FC<React.PropsWithChildren> = ({ children }) => {
    const pageLoadingRef = usePageLoading();

    return (
        <>
            <PageLoadingProgress ref={pageLoadingRef} />

            <div className={s.App}>
                <SideBar />

                <div className={s.Outlet}>{children}</div>
            </div>
        </>
    );
};
