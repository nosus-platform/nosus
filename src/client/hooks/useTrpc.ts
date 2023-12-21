import { QueryClient } from '@tanstack/react-query';
import { httpBatchLink } from '@trpc/client';
import { useNavigate } from 'react-router-dom';

import { trpc } from '../utils/trpc';
import { useState } from 'react';
import { paths } from '../components/Router';
import { useAuth } from './useAuth';

const authHeader = (token?: string) =>
    !token
        ? Object.create({})
        : {
              Authorization: `Bearer ${token}`,
          };

export const useTrpc = () => {
    const navigate = useNavigate();
    const { token, refreshToken } = useAuth();
    const [queryClient] = useState(() => new QueryClient());
    const [trpcClient] = useState(() =>
        trpc.createClient({
            links: [
                httpBatchLink({
                    url: paths.api(),
                    headers: () => authHeader(token),
                    fetch: async (input, init?) => {
                        return fetch(input, {
                            ...init,
                            credentials: 'include',
                        }).then(async (res) => {
                            if (res.status === 401 && refreshToken) {
                                const refreshTokenRes = await fetch(paths.apiAuthRefresh(), {
                                    method: 'POST',
                                    // allow server cookies
                                    credentials: 'same-origin',
                                });

                                if (refreshTokenRes.status === 401 || refreshTokenRes.status === 500) {
                                    navigate(paths.authSignin());

                                    return {
                                        json() {
                                            return Promise.resolve(undefined);
                                        },
                                    };
                                }

                                const newCreds = await refreshTokenRes.json();
                                return fetch(input, {
                                    ...init,
                                    headers: {
                                        ...init?.headers,
                                        ...authHeader(newCreds.result.data.token),
                                    },
                                });
                            }

                            return res;
                        });
                    },
                }),
            ],
        }),
    );

    return { queryClient, trpcClient };
};
