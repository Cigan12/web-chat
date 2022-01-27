import React from 'react';
import Logo from 'assets/logo.svg';
import { Label } from 'components/forms/Label/Label.component';
import {
    StyledAuthModal,
    StyledAuthModalButton,
    StyledAuthModalChangeModalButton,
    StyledAuthModalFields,
    StyledAuthModalInput,
    StyledAuthModalLogo,
} from '../CommonStyles/AuthModals.modal.styled';
import { StyledModalOverlay } from '../CommonStyles/CommonStyles.modal.styled';
import { LSignUpView } from './SignUp.modal.logic';

export interface ISignUpModalProps {
    onOpenSignInModal: () => void;
}

export const SignUpModal: React.FC<ISignUpModalProps> = ({
    onOpenSignInModal,
}) => {
    const { onSubmit, register, errors, isNotAvailableForSubmit } =
        LSignUpView(onOpenSignInModal);

    return (
        <StyledModalOverlay>
            <StyledAuthModal>
                <StyledAuthModalLogo src={Logo} alt="logo" />
                <StyledAuthModalFields>
                    <form onSubmit={onSubmit}>
                        <Label>
                            Имя пользователя
                            <StyledAuthModalInput
                                type="text"
                                placeholder="Введите имя пользователя"
                                {...register('username')}
                                error={errors.username?.message}
                            />
                        </Label>
                        <Label>
                            Электронная почта
                            <StyledAuthModalInput
                                type="text"
                                placeholder="Введите электронную почту"
                                {...register('email')}
                                error={errors.email?.message}
                            />
                        </Label>
                        <Label>
                            Пароль
                            <StyledAuthModalInput
                                type="password"
                                placeholder="Введите пароль"
                                {...register('password')}
                                error={errors.password?.message}
                            />
                        </Label>

                        <Label>
                            Подтвердите пароль
                            <StyledAuthModalInput
                                type="password"
                                placeholder="Введите пароль"
                                {...register('passwordRepeat')}
                                error={errors.passwordRepeat?.message}
                            />
                        </Label>

                        <StyledAuthModalButton
                            type="submit"
                            disabled={isNotAvailableForSubmit}
                        >
                            Зарегистрироваться
                        </StyledAuthModalButton>
                        <StyledAuthModalChangeModalButton
                            onClick={onOpenSignInModal}
                        >
                            У Вас уже есть аккаунт?
                        </StyledAuthModalChangeModalButton>
                    </form>
                </StyledAuthModalFields>
            </StyledAuthModal>
        </StyledModalOverlay>
    );
};
