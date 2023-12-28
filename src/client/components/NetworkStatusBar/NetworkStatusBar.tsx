import s from './NetworkStatusBar.module.pcss';

interface NetworkStatusBarProps {
    global?: boolean;
    remote?: boolean;
}

export const NetworkStatusBar: React.FC<NetworkStatusBarProps> = ({ global, remote }) => {
    const message: string[] = [];

    if (global) {
        message.push('No internet connection.');
    }

    if (remote) {
        message.push('No remote connection.');
    }

    return <div className={s.NetworkStatusBar}>{message.join(' ')}</div>;
};
