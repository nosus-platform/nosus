import type { Router } from 'express';
import passport from 'passport';
import passportLocal from 'passport-local';
import passportJWT from 'passport-jwt';

import { comparePassword } from './utils/password';
import * as queries from './database/queries';

const LocalStrategy = passportLocal.Strategy;
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

export const configurePassport = (router: Router) => {
    router.use(passport.initialize());
    router.use(passport.session());

    passport.use(
        'signin',
        new LocalStrategy({ usernameField: 'email', passwordField: 'password' }, (email, password, done) => {
            return queries.user
                .findForCreds({ email })
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
                return queries.user
                    .findByOrThrow({ id: jwtPayload.id })
                    .then((user) => cb(null, user))
                    .catch((err) => cb(err));
            },
        ),
    );
};
