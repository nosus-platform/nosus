import { routes } from '../../hooks/useRouter';
import { AppLogo } from '../AppLogo/AppLogo';
import { AppNavBar } from '../AppNavBar/AppNavBar';
import { AppNavBarItem } from '../AppNavBarItem/AppNavBarItem';

import s from './AppSideBar.module.pcss';

export const AppSideBar = () => {
    return (
        <div className={s.AppSideBar}>
            <AppLogo />

            <AppNavBar>
                <AppNavBarItem to={routes.index()} icon="home" text="Dashboard" />
            </AppNavBar>

            <AppNavBar>
                <AppNavBarItem to="#" icon="edit-markup" text="Posts" />
                <AppNavBarItem to="#" text="Drafts" />
                <AppNavBarItem to="#" text="Published" />
                <AppNavBarItem to="#" text="Scheduled" />
            </AppNavBar>

            <AppNavBar>
                <AppNavBarItem to="#" icon="notes" text="Pages" />
                <AppNavBarItem to={routes.tags()} icon="tag" text="Tags" />
                <AppNavBarItem to="#" icon="mail-open" text="Subscribers" />
            </AppNavBar>
        </div>
    );
};
