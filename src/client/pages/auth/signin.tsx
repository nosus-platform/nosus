import { useCallback } from 'react';

import { trpc } from '../../utils/trpc';
import type { SigninSchema } from '../../../server/contract/schema/auth';
import { useForm } from '../../hooks/useForm';
import { humanError } from '../../utils/humanError';
import { nullable } from '../../utils/nullable';
import { useRouter } from '../../hooks/useRouter';
import { Button } from '../../components/Button/Button';
import { Input } from '../../components/Input/Input';

export default () => {
    const router = useRouter();
    const { register, handleSubmit } = useForm<SigninSchema>({
        email: '',
        password: '',
    });

    const signinMutation = trpc.auth.signin.useMutation();

    const onSubmit = useCallback(
        async (data: SigninSchema) => {
            const credentials = await signinMutation.mutateAsync(data);

            if (credentials.token) router.index();
        },
        [signinMutation, router],
    );

    return (
        <>
            <h2>Signin</h2>

            {nullable(signinMutation.error, () => (
                <div>{JSON.stringify(humanError(signinMutation.error), null, 2)}</div>
            ))}

            <form onSubmit={handleSubmit(onSubmit)}>
                <Input {...register('email')} />
                <br />
                <Input type="password" {...register('password')} />
                <br />

                <Button view="primary" type="submit" text="Submit" />
            </form>
        </>
    );
};
