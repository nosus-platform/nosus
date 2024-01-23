import cn from 'classnames';
import { ArrowLongRightIcon } from '@heroicons/react/16/solid';

import { Link } from '../Link/Link';
import { nullable } from '../../utils/nullable';

import s from './AuthPromoList.module.pcss';

interface AuthPromoListProps {
    children: React.ReactNode;

    className?: string;
}

export const AuthPromoList: React.FC<AuthPromoListProps> = ({ children, className }) => {
    return <div className={cn(s.AuthPromoList, className)}>{children}</div>;
};

interface AuthPromoListItemProps {
    text: React.ReactNode;
    to: string;

    icon?: React.ReactNode;
    className?: string;
}

export const AuthPromoListItem: React.FC<AuthPromoListItemProps> = ({ text, to, icon, className }) => {
    return (
        <Link className={cn(s.AuthPromoListItemLink, className)} view="primary" to={to}>
            <span className={s.AuthPromoListItemLinkContent}>
                {nullable(icon, () => (
                    <span className={s.AuthPromoListItemIcon}>{icon}</span>
                ))}

                <span>{text}</span>
            </span>

            <ArrowLongRightIcon className={s.AuthPromoListItemArrowIcon} />
        </Link>
    );
};
