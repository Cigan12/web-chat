import { useSignUpMutation } from 'generated/graphql.types';
import { useForm } from 'react-hook-form';
import { ISignUpModalProps } from './SignUp.modal';

interface ISignUpFields {
    username: string;
    email: string;
    password: string;
    passwordRepeat: string;
}

export const LSignUpView = (
    onOpenSignInModal: ISignUpModalProps['onOpenSignInModal'],
) => {
    const { register, handleSubmit } = useForm<ISignUpFields>();
    const [signUp] = useSignUpMutation();
    const onSubmit = handleSubmit(async (values) => {
        const result = await signUp({
            variables: {
                input: {
                    email: values.email,
                    username: values.username,
                    password: values.password,
                },
            },
        });

        if (result.data?.signup) {
            onOpenSignInModal();
        }
    });

    return {
        onSubmit,
        register,
    };
};
