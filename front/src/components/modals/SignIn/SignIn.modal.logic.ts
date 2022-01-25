import { useSignInMutation } from 'generated/graphql.types';
import { useForm } from 'react-hook-form';

interface ISignInFields {
    login: string;
    password: string;
}

export const LSignInLogic = () => {
    const { register, handleSubmit } = useForm<ISignInFields>();
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
            alert('Success');
        }
    });

    return {
        onSubmit,
        register,
    };
};
