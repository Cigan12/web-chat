import { Label } from 'components/forms/Label/Label.component';
import React from 'react';
import Logo from 'assets/logo.svg';

import {
    StyledAuthModal,
    StyledAuthModalButton,
    StyledAuthModalChangeModalButton,
    StyledAuthModalFields,
    StyledAuthModalInput,
    StyledAuthModalLogo,
} from '../CommonStyles/AuthModals.modal.styled';
import { StyledModalOverlay } from '../CommonStyles/CommonStyles.modal.styled';
import { LSignInLogic } from './SignIn.modal.logic';

export interface ISignInModalProps {
    onOpenRegisterModal: () => void;
    onClose: () => void;
}

export const SignInModal: React.FC<ISignInModalProps> = ({
    onOpenRegisterModal,
    onClose,
}) => {
    const { onSubmit, register, errors, isNotAvailableForSubmit } =
        LSignInLogic(onClose);
    return (
        <StyledModalOverlay>
            <StyledAuthModal>
                <StyledAuthModalLogo src={Logo} alt="logo" />
                <StyledAuthModalFields>
                    <form onSubmit={onSubmit}>
                        <Label>
                            Электронная почта
                            <StyledAuthModalInput
                                type="text"
                                placeholder="Введите логин"
                                {...register('login')}
                                error={errors.login?.message}
                            />
                        </Label>

                        <Label>
                            Введите пароль
                            <StyledAuthModalInput
                                type="password"
                                placeholder="Введите пароль"
                                {...register('password')}
                                error={errors.password?.message}
                            />
                        </Label>

                        <StyledAuthModalButton
                            type="submit"
                            disabled={isNotAvailableForSubmit}
                        >
                            Войти
                        </StyledAuthModalButton>
                        <StyledAuthModalChangeModalButton
                            onClick={onOpenRegisterModal}
                        >
                            У Вас нет аккаунта?
                        </StyledAuthModalChangeModalButton>
                    </form>
                </StyledAuthModalFields>
            </StyledAuthModal>
        </StyledModalOverlay>
    );
};
