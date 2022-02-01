import {
    ENotificationModalType,
    useNotificationModals,
} from 'components/providers/NotificationModals/NotificationModals.provider';
import { GraphQLError } from 'graphql';
import { useEffect } from 'react';

export const useHandleErrors = (errors: readonly GraphQLError[]) => {
    const { toggleNotificationModal } = useNotificationModals();
    useEffect(() => {
        if (errors.length) {
            if (errors[0].message !== 'Unauthorized') {
                toggleNotificationModal({
                    text: errors[0].message,
                    type: ENotificationModalType.ERROR,
                });
            }
        }
    }, [errors]);
};
