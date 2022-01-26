import styled from 'styled-components';

interface IStyledAvatarProps {
    width?: string;
    height?: string;
}

export const StyledAvatar = styled.div<IStyledAvatarProps>`
    border-radius: 50%;
    width: ${({ width }) => width || '36px'};
    height: ${({ height }) => height || '36px'};
    background: ${({ theme }) => theme.colors.blue};
    display: grid;
    align-items: center;
    justify-content: center;
`;

interface IStyledAvatarImgProps {
    width?: string;
    height?: string;
}

export const StyledAvatarImg = styled.img<IStyledAvatarImgProps>`
    width: ${({ width }) => width || '16px'};
    height: ${({ height }) => height || '16px'};
`;
