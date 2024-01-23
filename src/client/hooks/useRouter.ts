import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

interface BuildRoutesMap {
    [route: string]: (...args: any) => string;
}

type BuildRouterResult<T extends BuildRoutesMap> = {
    [key in keyof T]: (...args: Parameters<T[key]>) => void;
};

function buildRouter<T extends BuildRoutesMap, K extends keyof T, BuildFn extends T[K]>(
    source: T,
    cb: (path: string) => void,
): BuildRouterResult<T> {
    return (Object.entries(source) as [keyof T, BuildFn][]).reduce((acc, [key, fn]) => {
        acc[key] = (...args: Parameters<T[K]>) => cb(fn.apply(null, args));

        return acc;
    }, {} as BuildRouterResult<T>);
}

// FIXME: must be a part of contract folder
const base = '/nosus';

export const routes = {
    index: () => `${base}/dash`,

    authSignin: () => `${base}/auth/signin`,
    authSignup: () => `${base}/auth/signup`,
    authBootstrap: () => `${base}/auth/bootstrap`,

    tags: () => `${base}/tags`,
    tagsNew: () => `${base}/tags/new`,
    tagsId: (id: number | string) => `${base}/tags/${id}`,

    api: () => `${base}/api`,
    apiAuthRefresh: () => `${base}/api/auth.refresh`,

    docs: () => '/docs',
    releases: () => '/releases',
    slack: () => '/slack',
};

export const useRouter = () => {
    const navigate = useNavigate();

    const router = useMemo(() => buildRouter(routes, navigate), []);

    return router;
};
