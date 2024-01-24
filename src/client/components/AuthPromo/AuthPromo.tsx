import cn from 'classnames';

import { Text } from '../Text/Text';

import s from './AuthPromo.module.pcss';

interface AuthPromoProps {
    children: React.ReactNode;
    title: string;
    description: string;

    className?: string;
}

export const AuthPromo: React.FC<AuthPromoProps> = ({ children, title, description, className }) => {
    return (
        <div className={cn(s.AuthPromo, className)}>
            <div className={s.AuthPromoContent}>
                <h1 className={s.AuthPromoTitle}>{title}</h1>
                <Text as="p" size="l" className={s.AuthPromoDescription}>
                    {description}
                </Text>

                {children}
            </div>
        </div>
    );
};
