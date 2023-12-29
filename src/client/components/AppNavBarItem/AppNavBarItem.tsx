import { NavLink } from 'react-router-dom';
import cn from 'classnames';

import { nullable } from '../../utils/nullable';

import 'css.gg/icons/css/home.css';
import 'css.gg/icons/css/edit-markup.css';
import 'css.gg/icons/css/notes.css';
import 'css.gg/icons/css/tag.css';
import 'css.gg/icons/css/mail-open.css';

import s from './AppNavBarItem.module.pcss';

interface AppNavBarItemProps {
    text: string;
    to: string;
    icon?: 'home' | 'notes' | 'tag' | 'edit-markup' | 'mail-open';
}

export const AppNavBarItem: React.FC<AppNavBarItemProps> = ({ icon, text, to }) => (
    <NavLink to={to} className={({ isActive }) => cn([s.AppNavBarItem, { [s.AppNavBarItem_active]: isActive }])}>
        <div className={cn(s.AppNavBarItemIcon)}>
            {nullable(icon, () => (
                <i className={`gg-${icon}`}></i>
            ))}
        </div>
        <div className={cn(s.AppNavBarItemText)}>{text}</div>
    </NavLink>
);
