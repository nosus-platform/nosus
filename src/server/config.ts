const dotEnv = process.env.NODE_ENV !== 'production' ? require('dotenv') : null;

if (dotEnv) dotEnv.config();

export const config = {
    port: process.env.PORT || 3000,
};
