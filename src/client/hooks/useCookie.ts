import { useCallback, useEffect, useState } from 'react';
import Cookies from 'js-cookie';

export const useCookie = (cookieName: string, interval?: number) => {
    const [value, setValue] = useState<string | undefined>(() => Cookies.get(cookieName));

    useEffect(() => {
        let id: NodeJS.Timeout | undefined;

        if (interval) {
            id = setInterval(() => {
                setValue(() => Cookies.get(cookieName));
            }, interval);
        }

        return () => {
            clearInterval(id);
        };
    }, [interval]);

    const updateCookie = useCallback(
        (newValue: string, options?: Cookies.CookieAttributes) => {
            Cookies.set(cookieName, newValue, options);
            setValue(newValue);
        },
        [cookieName],
    );

    const deleteCookie = useCallback(() => {
        Cookies.remove(cookieName);
        setValue(undefined);
    }, [cookieName]);

    return { value, updateCookie, deleteCookie };
};
