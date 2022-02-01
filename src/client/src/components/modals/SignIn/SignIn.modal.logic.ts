import { isAuthenticatedVar } from 'components/providers/Apollo/ApolloVariables.helper';
import {
    useSignInMutation,
    useVerifyEmailMutation,
} from 'generated/graphql.types';
import { useForm } from 'react-hook-form';
import { Validators } from 'utils/helpers/ValidationErrrors.helper';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useHandleErrors } from 'hooks/errors/HandleErrors.hook';
import { useEffect } from 'react';
import { ISignInModalProps } from './SignIn.modal';

interface ISignInFields {
    login: string;
    password: string;
}

const validationSchema = yup.object({
    login: Validators.email,
    password: Validators.password,
});

export const LSignInLogic = (onClose: ISignInModalProps['onClose']) => {
    const { register, handleSubmit, formState } = useForm<ISignInFields>({
        resolver: yupResolver(validationSchema),
        mode: 'onChange',
    });
    const [verifyEmail] = useVerifyEmailMutation();
    const [signIn, { error }] = useSignInMutation();

    useHandleErrors(error?.graphQLErrors ? error.graphQLErrors : []);
    const handleVerifyEmail = async (token: string) => {
        const result = await verifyEmail({
            variables: {
                token,
            },
        });

        if (result.data?.verifyEmail.access_token) {
            const { access_token, refresh_token } = result.data?.verifyEmail;
            localStorage.setItem('access_token', access_token);
            localStorage.setItem('refresh_token', refresh_token);
            isAuthenticatedVar(true);
            onClose();
            window.location.search = '';
        }
    };
    useEffect(() => {
        const urlSearch = window.location.search;
        const token = new URLSearchParams(urlSearch).get('token');
        if (token) {
            handleVerifyEmail(token);
        }
    }, []);

    const onSubmit = handleSubmit(async (values) => {
        const result = await signIn({
            variables: {
                input: {
                    login: values.login,
                    password: values.password,
                },
            },
        });

        if (result.data?.signin.access_token) {
            const { access_token, refresh_token } = result.data?.signin;
            localStorage.setItem('access_token', access_token);
            localStorage.setItem('refresh_token', refresh_token);
            isAuthenticatedVar(true);
            onClose();
            window.location.reload();
        }
    });

    return {
        onSubmit,
        register,
        errors: formState.errors,
        isNotAvailableForSubmit: !formState.isValid || formState.isSubmitting,
    };
};
