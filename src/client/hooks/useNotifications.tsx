import { useContext } from 'react';
import { Toaster, toast } from 'sonner';

import { pageContext } from '../context/page';

export const NotificationsStack: React.FC< React.ComponentProps<typeof Toaster>> = (props) => {
    const { theme } = useContext(pageContext);

    // TODO: https://sonner.emilkowal.ski/styling
    return <Toaster {...props} theme={theme} />;
};

export const useNotifications = () => ({
    createNotification: toast,
});
