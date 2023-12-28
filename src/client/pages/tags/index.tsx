import { Link } from 'react-router-dom';

import { useNotifications } from '../../hooks/useNotifications';
import { Button } from '../../components/Button/Button';

export default () => {
    const { createNotification } = useNotifications();

    return (
        <div>
            Tags
            <Link to={'2'}>Go to 2</Link>
            <Button view="primary" onClick={() => createNotification.success('Hi darling!')} text="Toast" />
        </div>
    );
};
