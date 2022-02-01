import { ENotificationModalType } from 'components/providers/NotificationModals/NotificationModals.provider';
import React from 'react';
import {
    StyledNotificaitonModal,
    StyledNotificationModalText,
} from './NotificationModal.component.styled';

interface INotificationModalProps {
    visible: boolean;
    text: string;
    type: ENotificationModalType;
}

export const NotificationModal: React.FC<INotificationModalProps> = ({
    text,
    type,
    visible,
}) => {
    return (
        <StyledNotificaitonModal visible={visible} type={type}>
            <StyledNotificationModalText>{text}</StyledNotificationModalText>
        </StyledNotificaitonModal>
    );
};
