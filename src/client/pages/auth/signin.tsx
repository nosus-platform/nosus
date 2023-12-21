import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import { trpc } from '../../utils/trpc';
import type { SigninSchema } from '../../../server/contract/schema/auth';
import { useForm } from '../../hooks/useForm';
import { humanError } from '../../utils/humanError';
import { nullable } from '../../utils/nullable';

export default () => {
    const navigate = useNavigate();
    const { register, handleSubmit } = useForm<SigninSchema>({
        email: '',
        password: '',
    });

    const signinMutation = trpc.auth.signin.useMutation();

    const onSubmit = useCallback(
        async (data: SigninSchema) => {
            const credentials = await signinMutation.mutateAsync(data);

            if (credentials.token) navigate('/nosus');
        },
        [signinMutation],
    );

    return (
        <div>
            <h3>Signin</h3>
            {nullable(signinMutation.error, () => (
                <div>{JSON.stringify(humanError(signinMutation.error), null, 2)}</div>
            ))}
            <form onSubmit={handleSubmit(onSubmit)}>
                <input {...register('email')} />
                <input {...register('password')} />

                <button type="submit">Submit</button>
            </form>
        </div>
    );
};
