import {
    HomeIcon,
    DocumentDuplicateIcon,
    DocumentTextIcon,
    TagIcon,
    EnvelopeIcon,
    Cog8ToothIcon,
} from '@heroicons/react/16/solid';

import { routes } from '../../../server/contract/routes';
import { AppNavBar } from '../AppNavBar/AppNavBar';
import { AppNavBarItem } from '../AppNavBarItem/AppNavBarItem';

import s from './AppSideBar.module.pcss';

export const AppSideBar = () => {
    return (
        <div className={s.AppSideBar}>
            <div className={s.AppSideBarMain}>
                <AppNavBar>
                    <AppNavBarItem to={routes.index()} icon={<HomeIcon />} text="Dashboard" />
                </AppNavBar>

                <AppNavBar>
                    <AppNavBarItem to="/posts" icon={<DocumentTextIcon />} text="Posts" />
                    <AppNavBarItem to="/posts/drafts" text="Drafts" />
                    <AppNavBarItem to="/posts/published" text="Published" />
                    <AppNavBarItem to="/posts/schedules" text="Scheduled" />
                </AppNavBar>

                <AppNavBar>
                    <AppNavBarItem to="/pages" icon={<DocumentDuplicateIcon />} text="Pages" />
                    <AppNavBarItem to={routes.tags()} icon={<TagIcon />} text="Tags" />
                    <AppNavBarItem to="/subscribers" icon={<EnvelopeIcon />} text="Subscribers" />
                </AppNavBar>

                <AppNavBar>
                    <AppNavBarItem to="/settings" icon={<Cog8ToothIcon />} text="Settings" />
                </AppNavBar>
            </div>
        </div>
    );
};
