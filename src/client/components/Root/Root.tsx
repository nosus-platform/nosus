import { PageContext } from '../../context/page';
import { ThemeResolver } from '../ThemeResolver/ThemeResolver';

import './Root.module.css';

export const Root: React.FC<React.PropsWithChildren> = ({ children }) => (
    <PageContext>
        <ThemeResolver>{children}</ThemeResolver>
    </PageContext>
);
