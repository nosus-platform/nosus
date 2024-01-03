import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';

import type { LoadingProgressRef } from '../components/LoadingProgress/LoadingProgress';

export const usePageLoading = () => {
    const pageLoadingRef = useRef<LoadingProgressRef>(null);
    const [progress, setProgress] = useState(false);
    const [prevLoc, setPrevLoc] = useState('');
    const location = useLocation();

    useEffect(() => {
        setPrevLoc(location.pathname);
        setProgress(true);

        if (location.pathname === prevLoc) {
            setPrevLoc('');
        }
    }, [location]);

    useEffect(() => {
        setProgress(false);
    }, [prevLoc]);

    useEffect(() => {
        progress ? pageLoadingRef.current?.start() : pageLoadingRef.current?.done();
    }, [progress]);

    return pageLoadingRef;
};
