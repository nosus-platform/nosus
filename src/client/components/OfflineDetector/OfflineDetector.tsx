import s from './OfflineDetector.module.css';

interface OfflineDetectorProps {
    global?: boolean;
    remote?: boolean;
}

export const OfflineDetector: React.FC<OfflineDetectorProps> = ({ global, remote }) => {
    const message: string[] = [];

    if (global) {
        message.push('No internet connection.');
    }

    if (remote) {
        message.push('No remote connection.');
    }

    return <div className={s.OfflineDetector}>{message.join(' ')}</div>;
};
