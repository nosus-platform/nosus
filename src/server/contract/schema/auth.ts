import { z } from 'zod';

import { prisma } from '../../utils/prisma';

const emailField = z.string().min(1, { message: 'Required field' }).email('Invalid email format');

export const signinSchema = z.object({
    email: emailField,
    password: z.string().min(1, { message: 'Required field' }),
});

export type SigninSchema = z.infer<typeof signinSchema>;

export const signupSchema = z.object({
    theme: z.string(),
    email: emailField.refine(async (email) => {
        const exists = await prisma.user.findUnique({
            where: {
                email,
            },
        });
        return !exists;
    }, 'Email already exists'),
    password: z.string().min(6, { message: 'Password must be longer than 6 symbols' }),
});

export type SignupSchema = z.infer<typeof signupSchema>;
