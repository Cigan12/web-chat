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

interface ISignUpModalProps {
    onOpenSignInModal: () => void;
}

export const SignUpModal: React.FC<ISignUpModalProps> = ({
    onOpenSignInModal,
}) => {
    const { onSubmit, register } = LSignUpView();

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
                            />
                        </Label>
                        <Label>
                            Электронная почта
                            <StyledAuthModalInput
                                type="text"
                                placeholder="Введите электронную почту"
                                {...register('email')}
                            />
                        </Label>
                        <Label>
                            Пароль
                            <StyledAuthModalInput
                                type="text"
                                placeholder="Введите пароль"
                                {...register('password')}
                            />
                        </Label>

                        <Label>
                            Подтвердите пароль
                            <StyledAuthModalInput
                                type="text"
                                placeholder="Введите пароль"
                                {...register('passwordRepeat')}
                            />
                        </Label>

                        <StyledAuthModalButton type="submit">
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
