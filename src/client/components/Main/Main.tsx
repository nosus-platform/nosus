import { MenuBar } from '../MenuBar/MenuBar';

import s from './Main.module.css';

export const Main: React.FC<React.PropsWithChildren> = ({ children }) => {
    return (
        <main className={s.Main}>
            <MenuBar />
            {children}
        </main>
    );
};
