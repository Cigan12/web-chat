import React from 'react';
import PersonIcon from 'assets/small/person.svg';
import { StyledAvatar, StyledAvatarImg } from './Avatar.component.styled';

interface IAvatarProps {
    width?: string;
    height?: string;
    iconWidth?: string;
    iconHeight?: string;
}

export const Avatar: React.FC<IAvatarProps> = ({
    height,
    width,
    iconHeight,
    iconWidth,
}) => {
    return (
        <StyledAvatar height={height} width={width}>
            <StyledAvatarImg
                height={iconHeight}
                width={iconWidth}
                src={PersonIcon}
                alt="avatar"
            />
        </StyledAvatar>
    );
};
