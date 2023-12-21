import type { Router } from 'express';
import passport from 'passport';
import passportLocal from 'passport-local';
import passportJWT from 'passport-jwt';

import { prisma } from './utils/prisma';
import { comparePassword } from './utils/password';

const LocalStrategy = passportLocal.Strategy;
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

export const configurePassport = (router: Router) => {
    router.use(passport.initialize());
    router.use(passport.session());

    passport.use(
        'signin',
        new LocalStrategy({ usernameField: 'email', passwordField: 'password' }, (email, password, done) => {
            return prisma.user
                .findUnique({ where: { email } })
                .then(async (user) => {
                    if (!user)
                        return done(undefined, false, {
                            message: `Email ${email} not found`,
                        });

                    const isMatch = await comparePassword(password, user.password);
                    if (isMatch) return done(undefined, user);
                    return done(undefined, false, {
                        message: 'Invalid email or password',
                    });
                })
                .catch((err) => done(err));
        }),
    );

    passport.use(
        new JWTStrategy(
            {
                jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
                secretOrKey: process.env.JWT_SECRET,
            },
            (jwtPayload, cb) => {
                return prisma.user
                    .findUnique({
                        where: { id: jwtPayload.id },
                        include: { settings: true },
                    })
                    .then((user) => {
                        if (!user) throw new Error('User not found');
                        return cb(null, user);
                    })
                    .catch((err) => {
                        return cb(err);
                    });
            },
        ),
    );
};
