import cn from 'classnames';

import { AppLogo } from '../AppLogo/AppLogo';
import { Text } from '../Text/Text';

import s from './AuthForm.module.pcss';

interface AuthFormProps {
    title: string;
    description: string;
    children: React.ReactNode;
    onSubmit: React.DOMAttributes<HTMLFormElement>['onSubmit'];

    className?: string;
}

export const AuthForm: React.FC<AuthFormProps> = ({ title, description, children, onSubmit, className }) => {
    return (
        <div className={cn(s.AuthForm, className)}>
            <div className={cn(s.AuthFormContent)}>
                <AppLogo />

                <Text className={s.AuthFormTitle} size="xl">
                    {title}
                </Text>

                <Text className={s.AuthFormDescription}>{description}</Text>

                <form className={s.AuthFormForm} onSubmit={onSubmit}>
                    {children}
                </form>
            </div>
        </div>
    );
};
