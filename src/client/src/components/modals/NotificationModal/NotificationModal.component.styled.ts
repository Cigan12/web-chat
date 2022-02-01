import { ENotificationModalType } from 'components/providers/NotificationModals/NotificationModals.provider';
import styled from 'styled-components';

interface IStyledNotificaitonModalProps {
    visible: boolean;
    type: ENotificationModalType;
}

export const StyledNotificaitonModal = styled.div<IStyledNotificaitonModalProps>`
    height: 48px;
    width: 100%;
    top: ${({ visible }) => (visible ? 0 : '-48px')};
    display: grid;
    align-items: center;
    justify-content: center;
    position: fixed;
    z-index: 20;
    transition: top 0.5s ease-out;
    background: ${({ theme, type }) => {
        switch (type) {
            case ENotificationModalType.INFO:
                return theme.colors.blue;
            case ENotificationModalType.ERROR:
                return theme.colors.red;
            default:
                return theme.colors.blue;
        }
    }};
`;

export const StyledNotificationModalText = styled.p`
    margin: 0;
    font: ${({ theme }) => theme.fonts.i400f16l20};
    color: ${({ theme }) => theme.colors.white};
`;
