import cn from 'classnames';

import { Text } from '../Text/Text';

import s from './FormTip.module.pcss';

interface FormTipProps {
    children: React.ReactNode;

    className?: string;
}

export const FormTip: React.FC<FormTipProps> = ({ className, children }) => {
    return (
        <Text size="s" className={cn(s.FormTip, className)}>
            {children}
        </Text>
    );
};
