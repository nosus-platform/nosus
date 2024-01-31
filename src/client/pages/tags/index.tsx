import { useCallback } from 'react';

import { AppOutlet } from '../../components/AppOutlet/AppOutlet';
import { useAuth } from '../../hooks/useAuth';
import { useRouter } from '../../hooks/useRouter';
import { Button } from '../../components/Button/Button';

const TagsActions = () => {
    const router = useRouter();
    const { signout } = useAuth();

    const handleSignout = useCallback(() => {
        signout();
        router.authSignin();
    }, [signout, router]);

    return <Button onClick={handleSignout} text="Signout" />;
};

export default () => {
    return (
        <AppOutlet actions={<TagsActions />} nav={'~/tags'}>
            <h2>Tags</h2>
            {/* <Link to={'2'}>Go to 2</Link> */}
            {/* <Button view="primary" onClick={() => createNotification.success('Hi darling!')} text="Toast" /> */}
        </AppOutlet>
    );
};
