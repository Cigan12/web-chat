import { Message } from 'components/cards/Message/Message.component';
import { TelegramIcon } from 'components/icons/Telegram.icon';
import styled from 'styled-components';

export const StyledChat = styled.div`
    display: grid;
    grid-template-rows: max-content 1fr max-content;
    height: calc(100vh - 37px);
`;

export const StyledChatContent = styled.div`
    padding: 24px 32px 8px;
    overflow: auto;
`;

export const StyledChatTopBar = styled.div`
    padding: 0 32px;
    border-bottom: 1px solid ${({ theme }) => theme.colors.inputGray};
    display: grid;
    align-items: center;
    height: 60px;
`;

export const StyledChatName = styled.h4`
    margin: 0;
    font: ${({ theme }) => theme.fonts.i700f14l16};
    color: ${({ theme }) => theme.colors.textBlack};
`;

export const StyledChatMessage = styled(Message)`
    margin-bottom: 16px;
`;

export const StyledChatInputContainer = styled.div`
    position: relative;
    width: 100%;
    margin-bottom: 2px;
`;

export const StyledChatInput = styled.input`
    border: none;
    border-top: 1px solid ${({ theme }) => theme.colors.inputGray};
    width: 100%;
    height: 60px;
    padding: 0 62px 0 34px;
    font: ${({ theme }) => theme.fonts.i400f14l20};
    color: ${({ theme }) => theme.colors.textBlack};
    ::placeholder {
        color: ${({ theme }) => theme.colors.gray};
    }

    :focus-visible {
        outline: none;
    }
`;

export const StyledChatInputTelegramIcon = styled(TelegramIcon)`
    cursor: pointer;
    position: absolute;
    right: 34px;
    top: 50%;
    transform: translateY(-50%);
`;
