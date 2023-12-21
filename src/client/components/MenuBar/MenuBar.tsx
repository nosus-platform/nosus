import { useAuth } from '../../hooks/useAuth';

import s from './MenuBar.module.css';

export const MenuBar = () => {
    const { signout } = useAuth();

    return (
        <div className={s.MenuBar}>
            Nosus
            <button onClick={() => signout()}>Signout</button>
        </div>
    );
};
