
import { routes } from '../../../server/contract/routes';
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
                <AppNavBarItem to="/posts" icon="edit-markup" text="Posts" />
                <AppNavBarItem to="/posts/drafts" text="Drafts" />
                <AppNavBarItem to="/posts/published" text="Published" />
                <AppNavBarItem to="/posts/schedules" text="Scheduled" />
            </AppNavBar>

            <AppNavBar>
                <AppNavBarItem to="/pages" icon="notes" text="Pages" />
                <AppNavBarItem to={routes.tags()} icon="tag" text="Tags" />
                <AppNavBarItem to="/subscribers" icon="mail-open" text="Subscribers" />
            </AppNavBar>
        </div>
    );
};
