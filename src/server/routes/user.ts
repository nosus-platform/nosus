import { protectedProcedure, router } from '../utils/trpc';

export const userRouter = router({
    session: protectedProcedure.query(({ ctx: { req, user } }) => ({
        id: user?.id,
        email: user?.email,
        emailVerified: user?.emailVerified,
        role: user?.role,
        image: user?.image,
        theme: user?.settings?.theme,
        locale: req.locale.language,
    })),
});
