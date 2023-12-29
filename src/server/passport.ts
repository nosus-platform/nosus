import type { Router } from 'express';
import passport from 'passport';
import passportLocal from 'passport-local';
import passportJWT from 'passport-jwt';

import * as queries from './database/queries';

const LocalStrategy = passportLocal.Strategy;
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

export const configurePassport = (router: Router) => {
    router.use(passport.initialize());
    router.use(passport.session());

    passport.use(
        'signin',
        new LocalStrategy({ usernameField: 'email', passwordField: 'password' }, (email, password, done) =>
            queries.user
                .findByCreds({ email, password })
                .then(async (user) => done(undefined, user))
                .catch(() =>
                    // log real error
                    done(undefined, false, {
                        message: 'Invalid email or password',
                    }),
                ),
        ),
    );

    passport.use(
        new JWTStrategy(
            {
                jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
                secretOrKey: process.env.JWT_SECRET,
            },
            (jwtPayload, cb) =>
                queries.user
                    .findByIdOrThrow({ id: jwtPayload.id })
                    .then((user) => cb(null, user))
                    .catch((err) => cb(err)),
        ),
    );
};
