import { Avatar } from 'components/small/Avatar/Avatar.component';
import React from 'react';
import {
    StyledMessage,
    StyledMessageContent,
    StyledMessageDate,
    StyledMessageText,
} from './Message.component.styled';

interface IMessageProps {
    date: Date;
    message: string;
    isOwner: boolean;
    className?: string;
}

export const Message: React.FC<IMessageProps> = ({
    date,
    message,
    isOwner,
    className,
}) => {
    return (
        <StyledMessage className={className}>
            <Avatar
                width="24px"
                height="24px"
                iconWidth="11px"
                iconHeight="11px"
            />
            <StyledMessageContent isOwner={isOwner}>
                <StyledMessageText>{message}</StyledMessageText>
                <StyledMessageDate>
                    {`${date.getHours()}:${date.getMinutes()}`}
                </StyledMessageDate>
            </StyledMessageContent>
        </StyledMessage>
    );
};
