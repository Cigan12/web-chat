import { NotificationModal } from 'components/modals/NotificationModal/NotificationModal.component';
import React, { createContext, useContext, useState } from 'react';
import { noop } from 'utils/helpers/SmallHelpers/noop.helper';

export enum ENotificationModalType {
    ERROR = 'ERROR',
    SUCCESS = 'SUCCESS',
    INFO = 'INFO',
}

interface INotificationModal {
    type: ENotificationModalType;
    text: string;
}

interface INotificationModalState {
    type: ENotificationModalType;
    text: string;
    visible: boolean;
}

interface INotificationModalsContext {
    toggleNotificationModal: (data: INotificationModal) => void;
}

const defaultContext: INotificationModalsContext = {
    toggleNotificationModal: noop,
};

const NotificationModalsContext =
    createContext<INotificationModalsContext>(defaultContext);

export const useNotificationModals = () => {
    return useContext(NotificationModalsContext);
};

export const NotificationModalsProvider: React.FC = ({ children }) => {
    const [notificationModal, setNotificationModal] =
        useState<INotificationModalState>({
            type: ENotificationModalType.INFO,
            text: '',
            visible: false,
        });

    const toggleNotificationModal = (data: INotificationModal) => {
        if (!notificationModal.visible) {
            setNotificationModal({
                type: data.type,
                text: data.text,
                visible: true,
            });

            setTimeout(() => {
                setNotificationModal({
                    type: data.type,
                    text: data.text,
                    visible: false,
                });
            }, 5000);
        }
    };

    const contextValue: INotificationModalsContext = {
        toggleNotificationModal,
    };

    return (
        <NotificationModalsContext.Provider value={contextValue}>
            {children}
            <NotificationModal
                text={notificationModal.text}
                type={notificationModal.type}
                visible={notificationModal.visible}
            />
        </NotificationModalsContext.Provider>
    );
};
