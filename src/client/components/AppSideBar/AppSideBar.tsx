import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import cn from 'classnames';
import {
    HomeIcon,
    DocumentDuplicateIcon,
    DocumentTextIcon,
    TagIcon,
    EnvelopeIcon,
    Cog8ToothIcon,
} from '@heroicons/react/16/solid';

import { nullable } from '../../utils/nullable';
import { pageContext } from '../../context/page';
import { routes } from '../../../server/contract/routes';
import { UserBadge } from '../UserBadge/UserBadge';
import { Dropdown, DropdownArrow, DropdownPanel, DropdownTrigger } from '../Dropdown/Dropdown';
import { Text } from '../Text/Text';

import s from './AppSideBar.module.pcss';

interface AppSideBarMenuItemProps {
    text: string;
    to: string;

    icon?: React.ReactNode;
}

const AppSideBarMenu: React.FC<React.PropsWithChildren> = ({ children }) => (
    <div className={s.AppSideBarMenu}>{children}</div>
);

const AppSideBarMenuItem: React.FC<AppSideBarMenuItemProps> = ({ icon, text, to }) => (
    <NavLink
        to={to}
        className={({ isActive }) => cn([s.AppSideBarMenuItem, { [s.AppSideBarMenuItem_active]: isActive }])}
    >
        <span className={s.AppSideBarMenuItemLinkContent}>
            {nullable(
                icon,
                () => (
                    <span className={s.AppSideBarMenuItemIcon}>{icon}</span>
                ),
                <span className={s.AppSideBarMenuItemTab} />,
            )}

            <Text size="s">{text}</Text>
        </span>
    </NavLink>
);

export const AppSideBar = () => {
    const { user } = useContext(pageContext);

    return (
        <div className={s.AppSideBar}>
            <div className={s.AppSideBarMain}>
                <AppSideBarMenu>
                    <AppSideBarMenuItem to={routes.index()} icon={<HomeIcon />} text="Dashboard" />
                </AppSideBarMenu>

                <AppSideBarMenu>
                    <AppSideBarMenuItem to="/posts" icon={<DocumentTextIcon />} text="Posts" />
                    <AppSideBarMenuItem to="/posts/drafts" text="Drafts" />
                    <AppSideBarMenuItem to="/posts/published" text="Published" />
                    <AppSideBarMenuItem to="/posts/schedules" text="Scheduled" />
                </AppSideBarMenu>

                <AppSideBarMenu>
                    <AppSideBarMenuItem to="/pages" icon={<DocumentDuplicateIcon />} text="Pages" />
                    <AppSideBarMenuItem to={routes.tags()} icon={<TagIcon />} text="Tags" />
                    <AppSideBarMenuItem to="/subscribers" icon={<EnvelopeIcon />} text="Subscribers" />
                </AppSideBarMenu>

                <AppSideBarMenu>
                    <AppSideBarMenuItem to="/settings" icon={<Cog8ToothIcon />} text="Settings" />
                </AppSideBarMenu>
            </div>

            {nullable(user?.email, (email) => (
                <Dropdown>
                    <DropdownTrigger>
                        <UserBadge
                            image={user?.image || undefined}
                            email={email}
                            name={user?.name || undefined}
                            iconRight={<DropdownArrow />}
                        />
                    </DropdownTrigger>
                    <DropdownPanel>Hola</DropdownPanel>
                </Dropdown>
            ))}
        </div>
    );
};
