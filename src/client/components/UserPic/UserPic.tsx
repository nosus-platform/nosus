import React, { useEffect, useState } from 'react';
import cn from 'classnames';

import { LoadState } from '../../types/common';
import { preloadImage } from '../../utils/preloadImage';
import { initials } from '../../utils/initials';
import { GradientCircle } from '../GradientCircle/GradientCircle';
import { Gravatar } from '../Gravatar/Gravatar';

import s from './UserPic.module.pcss';

interface UserPicProps {
    email?: string;

    name?: string;
    src?: string;
    className?: string;
}

export const UserPic: React.FC<UserPicProps> = ({ email, name, src, className }) => {
    // const mounted = useMounted();
    const [status, setStatus] = useState<LoadState>(src ? LoadState.loading : LoadState.error);
    const cnProvider = (str: string) => cn(s.UserPic, `${s.UserPic}${status}`, str, className);

    useEffect(() => {
        if (LoadState.loading && src) {
            preloadImage(src)
                .then(() => setStatus(LoadState.success))
                .catch(() => setStatus(LoadState.error));
        }
    }, [src]);

    const viewMap = {
        [LoadState.loading]: (
            <GradientCircle source={String(email)} className={cnProvider(`${s.UserPic}GradientCircle`)}>
                {initials(name)}
            </GradientCircle>
        ),
        [LoadState.success]: <img src={src} alt={String(name || email)} className={cnProvider(`${s.UserPic}Image`)} />,
        [LoadState.error]: <Gravatar email={email} className={cnProvider(`${s.UserPic}Gravatar`)} />,
    };

    return viewMap[status];
};
