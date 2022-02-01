import styled from 'styled-components';

export const StyledMessage = styled.div`
    display: grid;
    grid-template-columns: max-content max-content;
    gap: 8px;
    align-items: flex-end;
`;

interface IStyledMessageContentProps {
    isOwner: boolean;
}

export const StyledMessageContent = styled.div<IStyledMessageContentProps>`
    background: ${({ theme, isOwner }) =>
        isOwner ? theme.colors.messageBg : theme.colors.lightgray};
    max-width: 496px;
    border-radius: 12px 12px 12px 0;
    padding: 8px 16px;
    display: grid;
    grid-template-columns: 1fr max-content;
    gap: 8px;
`;

export const StyledMessageText = styled.p`
    margin: 0;
    font: ${({ theme }) => theme.fonts.i400f12l16};
    color: ${({ theme }) => theme.colors.textBlack};
    word-wrap: break-word;
    word-break: break-all;
`;

export const StyledMessageDate = styled.span`
    font: ${({ theme }) => theme.fonts.i400f12l16};
    color: ${({ theme }) => theme.colors.gray};
`;
