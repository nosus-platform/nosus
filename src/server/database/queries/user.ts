import { Insertable } from 'kysely';

import { db } from '..';
import { User, UserSettings } from '../types';
import { comparePassword, encryptPassword } from '../../utils/encrypt';

export type UserSession = ReturnType<typeof findByIdOrThrow>;

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

        await trx
            .insertInto('UserSettings')
            .values({
                ...s,
                userId: user.id,
            })
            .executeTakeFirstOrThrow();

        return user;
    });
}

export async function findByIdOrThrow({ id }: { id: string }) {
    return db
        .selectFrom('User')
        .innerJoin('UserSettings', 'UserSettings.userId', 'User.id')
        .select(['User.id', 'User.email', 'User.name', 'User.image', 'User.role', 'UserSettings.theme'])
        .where('User.id', '=', id)
        .executeTakeFirstOrThrow();
}

export async function findByCreds({ email, password }: { email: string; password: string }) {
    const user = await db
        .selectFrom('User')
        .select(['User.id', 'User.email', 'User.password'])
        .where('User.email', '=', email)
        .executeTakeFirst();

    if (!user) throw new Error('User not found');

    const allowed = await comparePassword(password, user.password);

    if (!allowed) throw new Error('Invalid password');

    return user;
}

export async function exists({ email }: { email: string }) {
    const user = await db.selectFrom('User').select(['User.id']).where('User.email', '=', email).executeTakeFirst();

    return Boolean(user);
}
