import { SignInModal } from 'components/modals/SignIn/SignIn.modal';
import { SignUpModal } from 'components/modals/SignUp/SignUp.modal';
import React, { createContext, useCallback, useContext, useState } from 'react';
import { noop } from 'utils/SmallHelpers/noop.helper';

const initialContextValue: IAuthModalsContext = {
    toggleSignInModal: noop,
    signInModal: false,
    toggleSignUpModal: noop,
    openSignInModal: noop,
    signUpModal: false,
};

interface IAuthModalsContext {
    toggleSignInModal: () => void;
    openSignInModal: () => void;
    signInModal: boolean;
    toggleSignUpModal: () => void;
    signUpModal: boolean;
}

const AuthModalsContext =
    createContext<IAuthModalsContext>(initialContextValue);

export const useAuthModals = () => {
    return useContext(AuthModalsContext);
};

export const AuthModalsProvider: React.FC = ({ children }) => {
    // SIGN IN MODAL
    const [signInModal, setSignInModal] = useState(false);

    const toggleSignInModal = useCallback(() => {
        setSignInModal((prev) => !prev);
    }, []);

    const openSignInModal = useCallback(() => {
        setSignInModal(true);
    }, []);

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
        openSignInModal,
        signInModal,
        toggleSignUpModal,
        signUpModal,
    };

    return (
        <AuthModalsContext.Provider value={contextValue}>
            {children}
            {signInModal && (
                <SignInModal
                    onOpenRegisterModal={handleOpenSignUpModal}
                    onClose={toggleSignInModal}
                />
            )}
            {signUpModal && (
                <SignUpModal onOpenSignInModal={handleOpenSignInModal} />
            )}
        </AuthModalsContext.Provider>
    );
};
