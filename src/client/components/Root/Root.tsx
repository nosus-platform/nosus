import { PageContext } from '../../context/page';

import './Root.module.pcss';
import '../Typo/Typo.module.pcss';

export const Root: React.FC<React.PropsWithChildren> = ({ children }) => <PageContext>{children}</PageContext>;
