import React from 'react';
import { StyledUserCard } from './UserCard.styled';

interface IUserCardProps {
    username: string;
    active?: boolean;
    onClick?: () => void;
}

export const UserCard: React.FC<IUserCardProps> = ({
    username,
    active,
    onClick,
}) => {
    return (
        <StyledUserCard active={active} onClick={onClick}>
            {username}
        </StyledUserCard>
    );
};
