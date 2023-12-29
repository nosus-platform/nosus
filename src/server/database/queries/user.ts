import { Insertable } from 'kysely';

import { db } from '..';
import { User, UserSettings } from '../types';
import { encryptPassword } from '../../utils/encrypt';

interface UserFindOptions {
    id?: string;
    email?: string;
}

export type UserSession = ReturnType<typeof findByOrThrow>;

export async function create(u: Insertable<User>, s: Omit<Insertable<UserSettings>, 'userId'>) {
    return db.transaction().execute(async (trx) => {
        const user = await trx
            .insertInto('User')
            .values({
                ...u,
                password: await encryptPassword(u.password),
            })
            .returningAll()
            .executeTakeFirstOrThrow();

        await trx.insertInto('UserSettings').values({
            ...s,
            userId: user.id,
        }).executeTakeFirstOrThrow();

        return user;
    });
}

export async function findByOrThrow({ id, email }: UserFindOptions) {
    if (!id && !email) throw new Error('Must provide either id or email');

    let query = db
        .selectFrom('User')
        .innerJoin('UserSettings', 'UserSettings.userId', 'User.id')
        .select(['User.id', 'User.email', 'User.name', 'User.image', 'User.role', 'UserSettings.theme']);

    if (id) query = query.where('User.id', '=', id);
    if (email) query = query.where('User.email', '=', email);

    return query.executeTakeFirstOrThrow();
}

export async function findForCreds({ id, email }: UserFindOptions) {
    if (!id && !email) throw new Error('Must provide either id or email');

    let query = db
        .selectFrom('User')
        .select(['User.id', 'User.email', 'User.password', 'User.role']);

    if (id) query = query.where('User.id', '=', id);
    if (email) query = query.where('User.email', '=', email);

    return query.executeTakeFirst();
}

export async function findForSession({ id, email }: UserFindOptions) {
    if (!id && !email) throw new Error('Must provide either id or email');

    let query = db
        .selectFrom('User')
        .innerJoin('UserSettings', 'UserSettings.userId', 'User.id')
        .select(['User.id', 'User.email', 'User.name', 'User.image', 'User.role', 'UserSettings.theme']);

    if (id) query = query.where('User.id', '=', id);
    if (email) query = query.where('User.email', '=', email);

    return query.executeTakeFirst();
}
