import { GetChatsQuery } from 'generated/graphql.types';
import { useNotCurrentUser } from 'hooks/NotCurrentUser.hook';
import React from 'react';
import { StyledUserCard } from '../UserCard/UserCard.styled';

interface IChatCardProps {
    chat: GetChatsQuery['chats'][number];
    active?: boolean;
    onClick?: () => void;
}

export const ChatCardComponent: React.FC<IChatCardProps> = ({
    chat,
    active,
    onClick,
}) => {
    const chatUsers = chat.users;
    const notCurrentUser = useNotCurrentUser(chatUsers);

    const chatName =
        chat.type === 'PRIVATE' ? notCurrentUser?.username : 'Some chat name';

    return (
        <StyledUserCard active={active} onClick={onClick}>
            {chatName}
        </StyledUserCard>
    );
};
