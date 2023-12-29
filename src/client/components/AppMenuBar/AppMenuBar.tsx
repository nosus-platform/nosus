import { useCallback } from 'react';

import { useAuth } from '../../hooks/useAuth';
import { useRouter } from '../../hooks/useRouter';
import { Button } from '../Button/Button';

import s from './AppMenuBar.module.pcss';

export const AppMenuBar = () => {
    const router = useRouter();
    const { signout } = useAuth();

    const handleSignout = useCallback(() => {
        signout();
        router.authSignin();
    }, [signout, router]);

    return (
        <div className={s.AppMenuBar}>
            <Button onClick={handleSignout} text="Signout" />
        </div>
    );
};
