import { NavLink } from 'react-router-dom';
import cn from 'classnames';

import { nullable } from '../../utils/nullable';
import { Text } from '../Text/Text';

import s from './AppNavBarItem.module.pcss';

interface AppNavBarItemProps {
    text: string;
    to: string;

    icon?: React.ReactNode;
}

export const AppNavBarItem: React.FC<AppNavBarItemProps> = ({ icon, text, to }) => (
    <NavLink to={to} className={({ isActive }) => cn([s.AppNavBarItem, { [s.AppNavBarItem_active]: isActive }])}>
        <span className={s.AppNavBarItemLinkContent}>
            {nullable(
                icon,
                () => (
                    <span className={s.AppNavBarItemIcon}>{icon}</span>
                ),
                <span className={s.AppNavBarItemTab} />,
            )}

            <Text size="s">{text}</Text>
        </span>
    </NavLink>
);
