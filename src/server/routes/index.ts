import { router } from '../utils/trpc';

import { authRouter } from './auth';
import { userRouter } from './user';

export const trpcRouter = router({
    auth: authRouter,
    user: userRouter,
});

export type TrpcRouter = typeof trpcRouter;
