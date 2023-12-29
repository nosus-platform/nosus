import { Pool } from 'pg';
import { Kysely, PostgresDialect } from 'kysely';

import { DB } from './types';

const dialect = new PostgresDialect({
    pool: new Pool({
        host: process.env.DATABASE_HOST || 'localhost',
        database: process.env.DATABASE_NAME || 'nosus',
        user: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        max: process.env.DATABASE_CONNECTIONS ? parseInt(process.env.DATABASE_CONNECTIONS) : 10,
    }),
});

export const db = new Kysely<DB>({
    dialect,
});
