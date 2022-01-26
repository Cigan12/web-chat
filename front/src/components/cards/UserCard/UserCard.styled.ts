import styled from 'styled-components';

export const StyledUserCard = styled.div`
    cursor: pointer;
    display: grid;
    grid-template-columns: max-content 1fr;
    gap: 12px;
    align-items: center;
    padding: 5px 24px 7px;
    height: 50px;
    position: relative;
`;

export const StyledUserAvatar = styled.div`
    border-radius: 50%;
    height: 36px;
    width: 36px;
    background: ${({ theme }) => theme.colors.blue};
    display: grid;
    align-items: center;
    justify-content: center;
`;

export const StyledUserAvatarImg = styled.img`
    width: 16px;
    height: 16px;
`;

export const StyledUserCardTopText = styled.div`
    display: grid;
    grid-template-columns: 1fr max-content;
    align-items: center;
`;

interface IStyledUserCardTitleProps {
    active?: boolean;
}

export const StyledUserCardTitle = styled.h5<IStyledUserCardTitleProps>`
    font: ${({ theme }) => theme.fonts.i400f14l20};
    color: ${({ theme, active }) =>
        active ? theme.colors.blue : theme.colors.textBlack};
    margin: 0;
`;

export const StyledUserCardMessage = styled.p`
    font: ${({ theme }) => theme.fonts.i400f12l16};
    color: ${({ theme }) => theme.colors.gray};
    margin-top: 2px;
    margin-bottom: 0;
`;

export const StyledUserCardMessageTime = styled.span`
    font: ${({ theme }) => theme.fonts.i400f12l16};
    color: ${({ theme }) => theme.colors.gray};
`;

interface IStyledUserCardActiveLineProps {
    active?: boolean;
}

export const StyledUserCardActiveLine = styled.div<IStyledUserCardActiveLineProps>`
    position: absolute;
    background: #007aff;
    border-radius: 0px 4px 4px 0px;
    height: 50px;
    width: 2px;
    left: -1px;
    ${({ active }) => !active && 'display: none;'}
`;

export const StyledOwnerMessage = styled.span`
    color: ${({ theme }) => theme.colors.blue};
`;
