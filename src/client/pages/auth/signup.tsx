import { useCallback } from 'react';
import { useTheme } from 'next-themes';

import { trpc } from '../../utils/trpc';
import type { SignupSchema } from '../../../server/contract/schema/auth';
import { useForm } from '../../hooks/useForm';
import { humanError } from '../../utils/humanError';
import { nullable } from '../../utils/nullable';
import { useRouter } from '../../hooks/useRouter';

export default () => {
    const router = useRouter();
    const { resolvedTheme } = useTheme();
    const { register, handleSubmit } = useForm<SignupSchema>({
        email: '',
        password: '',
        theme: resolvedTheme,
    });

    const signupMutation = trpc.auth.signup.useMutation();

    const onSubmit = useCallback(
        async (data: SignupSchema) => {
            await signupMutation.mutateAsync(data);
            router.index();
        },
        [signupMutation, router],
    );

    return (
        <>
            <h3>Signup</h3>
            {nullable(signupMutation.error, () => (
                <div>{JSON.stringify(humanError(signupMutation.error), null, 2)}</div>
            ))}
            <form onSubmit={handleSubmit(onSubmit)}>
                <input {...register('email')} />
                <input {...register('password')} />

                <button type="submit">Submit</button>
            </form>
        </>
    );
};
