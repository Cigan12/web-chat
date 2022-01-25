import { SignInModal } from 'components/modals/SignIn/SignIn.modal';
import { SignUpModal } from 'components/modals/SignUp/SignUp.modal';
import React, { createContext, useContext, useState } from 'react';
import { noop } from 'utils/SmallHelpers/noop.helper';

const initialContextValue: IAuthModalsContext = {
    toggleSignInModal: noop,
    toggleSignUpModal: noop,
};

interface IAuthModalsContext {
    toggleSignInModal: () => void;
    toggleSignUpModal: () => void;
}

const AuthModalsContext =
    createContext<IAuthModalsContext>(initialContextValue);

export const useAuthModals = () => {
    return useContext(AuthModalsContext);
};

export const AuthModalsProvider: React.FC = ({ children }) => {
    // SIGN IN MODAL
    const [signInModal, setSignInModal] = useState(true);

    const toggleSignInModal = () => {
        setSignInModal((prev) => !prev);
    };

    // SIGN UP MODAL
    const [signUpModal, setSignUpModal] = useState(false);

    const toggleSignUpModal = () => {
        setSignUpModal((prev) => !prev);
    };

    const handleOpenSignUpModal = () => {
        toggleSignInModal();
        toggleSignUpModal();
    };

    const handleOpenSignInModal = () => {
        toggleSignUpModal();
        toggleSignInModal();
    };

    const contextValue: IAuthModalsContext = {
        toggleSignInModal,
        toggleSignUpModal,
    };

    return (
        <AuthModalsContext.Provider value={contextValue}>
            {children}
            {signInModal && (
                <SignInModal onOpenRegisterModal={handleOpenSignUpModal} />
            )}
            {signUpModal && (
                <SignUpModal onOpenSignInModal={handleOpenSignInModal} />
            )}
        </AuthModalsContext.Provider>
    );
};
