import { Avatar } from 'components/small/Avatar/Avatar.component';
import React from 'react';
import {
    StyledOwnerMessage,
    StyledUserCard,
    StyledUserCardActiveLine,
    StyledUserCardMessage,
    StyledUserCardMessageTime,
    StyledUserCardTitle,
    StyledUserCardTopText,
} from './UserCard.styled';

export interface IUserCardMessage {
    message: string;
    isOwner: boolean;
    date: Date;
}
interface IUserCardProps {
    className?: string;
    username: string;
    active?: boolean;
    onClick?: () => void;
    message?: IUserCardMessage;
}

export const UserCard: React.FC<IUserCardProps> = ({
    username,
    active,
    onClick,
    className,
    message,
}) => {
    return (
        <StyledUserCard className={className} onClick={onClick}>
            <StyledUserCardActiveLine active={active} />
            <Avatar />

            <div>
                <StyledUserCardTopText>
                    <StyledUserCardTitle active={active}>
                        {username}
                    </StyledUserCardTitle>
                    {message && (
                        <StyledUserCardMessageTime>{`${message.date.getHours()}:${message.date.getMinutes()}`}</StyledUserCardMessageTime>
                    )}
                </StyledUserCardTopText>
                {message && (
                    <StyledUserCardMessage>
                        {message.isOwner ? (
                            <>
                                <StyledOwnerMessage>Вы: </StyledOwnerMessage>
                                {message.message}
                            </>
                        ) : (
                            message.message
                        )}
                    </StyledUserCardMessage>
                )}
            </div>
        </StyledUserCard>
    );
};
