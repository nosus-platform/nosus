import cn from 'classnames';

import s from './AppOutlet.module.scss';

interface AppOutletProps {
    title: React.ReactNode;

    children?: React.ReactNode;
    nav?: React.ReactNode;
    actions?: React.ReactNode;
    className?: string;
}

export const AppOutlet: React.FC<AppOutletProps> = ({ title, children, nav, actions, className }) => {
    return (
        <div className={cn(s.AppOutlet, className)}>
            <div className={cn(s.AppOutletHeader)}>
                <div className={cn(s.AppOutletNav)}>{nav}</div>
                <div className={cn(s.AppOutletActions)}>{actions}</div>
            </div>

            <div className={cn(s.AppOutletContent)}>
                <h2 className={cn(s.AppOutletTitle)}>{title}</h2>

                {children}
            </div>
        </div>
    );
};
