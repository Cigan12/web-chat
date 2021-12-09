import { useSignUpMutation } from 'generated/graphql.types';
import { useForm } from 'react-hook-form';

interface ISignUpFields {
    username: string;
    email: string;
    password: string;
}

export const LSignUpView = () => {
    const { register, handleSubmit } = useForm<ISignUpFields>();
    const [signUp] = useSignUpMutation();
    const onSubmit = handleSubmit(async (values) => {
        await signUp({
            variables: {
                input: {
                    email: values.email,
                    username: values.username,
                    password: values.password,
                },
            },
            onError: (error) => {
                console.log(
                    '🚀 ~ file: SignUp.view.logic.ts ~ line 23 ~ onSubmit ~ error',
                    error,
                );
            },
        });
    });

    return {
        onSubmit,
        register,
    };
};
