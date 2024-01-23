import { useCallback } from 'react';
import { useTheme } from 'next-themes';
import { DocumentTextIcon, TagIcon, UserGroupIcon } from '@heroicons/react/24/outline';

import { trpc } from '../../utils/trpc';
import type { FirstSignupSchema } from '../../../server/contract/schema/auth';
import { useForm } from '../../hooks/useForm';
import { humanError } from '../../utils/humanError';
import { nullable } from '../../utils/nullable';
import { routes, useRouter } from '../../hooks/useRouter';
import { useCookie } from '../../hooks/useCookie';
import { cookies } from '../../../server/contract/cookies';
import { Input } from '../../components/Input/Input';
import { Button } from '../../components/Button/Button';
import { AuthPage } from '../../components/AuthPage/AuthPage';
import { AuthForm } from '../../components/AuthForm/AuthForm';
import { FormField, FormFieldInput, FormFieldLabel } from '../../components/FormField/FormField';
import { FormActions } from '../../components/FormActions/FormActions';
import { FormTip } from '../../components/FormTip/FormTip';
import { Link } from '../../components/Link/Link';
import { AuthPromo } from '../../components/AuthPromo/AuthPromo';
import { AuthPromoList, AuthPromoListItem } from '../../components/AuthPromoList/AuthPromoList';

export default () => {
    const router = useRouter();
    const { resolvedTheme: theme } = useTheme();
    const { deleteCookie: deleteFirstVisitCookie } = useCookie(cookies.firstVisit);

    const firstSignupForm = useForm<FirstSignupSchema>({
        email: '',
        password: '',
        project: '',
        theme,
    });

    const firstSignupMutation = trpc.auth.firstSignup.useMutation();

    const onSubmit = useCallback(
        async (data: FirstSignupSchema) => {
            await firstSignupMutation.mutateAsync(data as FirstSignupSchema);

            if (firstSignupMutation.isSuccess) {
                deleteFirstVisitCookie();
                router.index();
            }
        },
        [firstSignupMutation, router],
    );

    return (
        <AuthPage>
            <div>
                <AuthPromo
                    title="Let's publish?"
                    description="Create your first blog in one step. Complete blog name and administrator credentials."
                >
                    <AuthPromoList>
                        <AuthPromoListItem to={routes.docs()} icon={<DocumentTextIcon />} text="Read the docs" />
                        <AuthPromoListItem to={routes.releases()} icon={<TagIcon />} text="Checkout latest releases" />
                        <AuthPromoListItem
                            to={routes.slack()}
                            icon={<UserGroupIcon />}
                            text="Join our Slack Community"
                        />
                    </AuthPromoList>
                </AuthPromo>
            </div>

            <div>
                <AuthForm
                    title="Welcome to Nosus"
                    description="Blogging platform w/o pitfalls"
                    onSubmit={firstSignupForm.handleSubmit(onSubmit)}
                >
                    {nullable(firstSignupMutation.error, (err) => (
                        <div>{JSON.stringify(humanError(err), null, 2)}</div>
                    ))}

                    <FormField {...firstSignupForm.register('email')}>
                        <FormFieldLabel>Email</FormFieldLabel>
                        <FormFieldInput>
                            <Input autoComplete="on" autoFocus />
                        </FormFieldInput>
                    </FormField>

                    <FormField {...firstSignupForm.register('password')}>
                        <FormFieldLabel>Password</FormFieldLabel>
                        <FormFieldInput>
                            <Input />
                        </FormFieldInput>
                    </FormField>

                    <FormField {...firstSignupForm.register('project')}>
                        <FormFieldLabel>Blog name</FormFieldLabel>
                        <FormFieldInput>
                            <Input />
                        </FormFieldInput>
                    </FormField>

                    <FormActions>
                        <Button stretched view="primary" type="submit" text="Start blogging" />
                    </FormActions>

                    <FormTip>
                        Already have an account?{' '}
                        <Link color="var(--text-primary)" view="inline" to={routes.authSignin()}>
                            Sign in
                        </Link>
                        .
                    </FormTip>
                </AuthForm>
            </div>
        </AuthPage>
    );
};
