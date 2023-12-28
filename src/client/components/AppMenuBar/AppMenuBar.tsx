import { useCallback } from 'react';

import { useNotifications } from '../../hooks/useNotifications';
import { useAuth } from '../../hooks/useAuth';
import { useRouter } from '../../hooks/useRouter';
import { Button } from '../Button/Button';

import s from './AppMenuBar.module.pcss';

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
            <Button onClick={() => createNotification.success('Hi darling!')} text="Toast" />
            <Button onClick={handleSignout} view="primary" text='Signout'/>
        </div>
    );
};
