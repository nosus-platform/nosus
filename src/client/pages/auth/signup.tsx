import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from 'next-themes';

import { trpc } from '../../utils/trpc';
import type { SignupSchema } from '../../../server/contract/schema/auth';
import { useForm } from '../../hooks/useForm';
import { paths } from '../../components/Router';
import { humanError } from '../../utils/humanError';
import { nullable } from '../../utils/nullable';

export default () => {
    const navigate = useNavigate();
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
            navigate(paths.index());
        },
        [signupMutation],
    );

    return (
        <div>
            <h3>Signup</h3>
            {nullable(signupMutation.error, () => (
                <div>{JSON.stringify(humanError(signupMutation.error), null, 2)}</div>
            ))}
            <form onSubmit={handleSubmit(onSubmit)}>
                <input {...register('email')} />
                <input {...register('password')} />

                <button type="submit">Submit</button>
            </form>
        </div>
    );
};
