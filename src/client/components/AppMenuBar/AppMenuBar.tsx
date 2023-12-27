import { useCallback } from 'react';

import { useNotifications } from '../../hooks/useNotifications';
import { useAuth } from '../../hooks/useAuth';

import s from './AppMenuBar.module.css';
import { useRouter } from '../../hooks/useRouter';

export const AppMenuBar = () => {
    const router = useRouter();
    const { signout } = useAuth();
    const { createNotification } = useNotifications();

    const handleSignout = useCallback(() => {
        signout();
        router.authSignin();
    }, [signout, router]);

    return (
        <div className={s.AppMenuBar}>
            Nosus
            <button onClick={() => createNotification.success('Hi darling!')}>Toast</button>
            <button onClick={handleSignout}>Signout</button>
        </div>
    );
};
