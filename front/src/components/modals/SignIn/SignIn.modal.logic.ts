import { isAuthenticatedVar } from 'components/providers/Apollo/ApolloVariables.helper';
import { useSignInMutation } from 'generated/graphql.types';
import { useForm } from 'react-hook-form';
import { Validators } from 'utils/helpers/ValidationErrrors.helper';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
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
    });
    const [signIn] = useSignInMutation();

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
        }
    });

    return {
        onSubmit,
        register,
        errors: formState.errors,
        isNotAvailableForSubmit: !formState.isValid || formState.isSubmitting,
    };
};
