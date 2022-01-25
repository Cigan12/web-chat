import { useAuthModals } from 'components/providers/AuthModals/AuthModals.provider';
import { GraphQLError } from 'graphql';
import { useEffect } from 'react';

export const useHandleErrors = (errors: GraphQLError[]) => {
    const { openSignInModal, signInModal, signUpModal } = useAuthModals();
    useEffect(() => {
        const isUnAuthorizedError = errors.find(
            (error) => (error as any).extensions.response.statusCode === 401,
        );
        if (isUnAuthorizedError && !signInModal && !signUpModal) {
            openSignInModal();
        }
    }, [errors]);
};
