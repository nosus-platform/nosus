import cn from 'classnames';

import s from './AppNavBar.module.pcss';

export const AppNavBar: React.FC<React.PropsWithChildren> = ({ children }) => (
    <div className={cn(s.AppNavBar)}>{children}</div>
);
