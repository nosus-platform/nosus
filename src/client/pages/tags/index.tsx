import { Link } from 'react-router-dom';

import { useNotifications } from '../../hooks/useNotifications';
import { Button } from '../../components/Button/Button';

export default () => {
    const { createNotification } = useNotifications();


    // TODO: breadcrumbs

    return (
        <div style={{ paddingTop: 'var(--gap-l)' }}>
            <h2 style={{ color: 'var(--primary-100)' }}>Tags</h2>
            {/* <Link to={'2'}>Go to 2</Link> */}
            {/* <Button view="primary" onClick={() => createNotification.success('Hi darling!')} text="Toast" /> */}
        </div>
    );
};
