import { useCallback } from 'react';

import { useAuth } from '../../hooks/useAuth';

import s from './AppMenuBar.module.css';
import { useRouter } from '../../hooks/useRouter';

export const AppMenuBar = () => {
    const router = useRouter();
    const { signout } = useAuth();

    const handleSignout = useCallback(() => {
        signout();
        router.authSignin();
    }, [signout, router]);

    return (
        <div className={s.AppMenuBar}>
            Nosus
            <button onClick={handleSignout}>Signout</button>
        </div>
    );
};
