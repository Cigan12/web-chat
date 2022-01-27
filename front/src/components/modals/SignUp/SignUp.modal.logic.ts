import {
    ENotificationModalType,
    useNotificationModals,
} from 'components/providers/NotificationModals/NotificationModals.provider';
import { useSignUpMutation } from 'generated/graphql.types';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { Validators } from 'utils/helpers/ValidationErrrors.helper';
import { yupResolver } from '@hookform/resolvers/yup';
import { ISignUpModalProps } from './SignUp.modal';

interface ISignUpFields {
    username: string;
    email: string;
    password: string;
    passwordRepeat: string;
}

const validationSchema = yup.object({
    username: Validators.username,
    email: Validators.email,
    password: Validators.password,
    passwordRepeat: Validators.passwordRepeat,
});

export const LSignUpView = (
    onOpenSignInModal: ISignUpModalProps['onOpenSignInModal'],
) => {
    const { register, handleSubmit, formState } = useForm<ISignUpFields>({
        resolver: yupResolver(validationSchema),
        mode: 'onChange',
    });
    const { toggleNotificationModal } = useNotificationModals();
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
            toggleNotificationModal({
                text: 'Письмо для подтверждения отправлено Вам на почту ',
                type: ENotificationModalType.INFO,
            });
            onOpenSignInModal();
        }
    });

    return {
        onSubmit,
        register,
        errors: formState.errors,
        isNotAvailableForSubmit: !formState.isValid || formState.isSubmitting,
    };
};
