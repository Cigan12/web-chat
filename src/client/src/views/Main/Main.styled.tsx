import { UserCard } from 'components/cards/UserCard/UserCard.component';
import styled from 'styled-components';

export const StyledMainView = styled.div`
    background-color: ${({ theme }) => theme.colors.white};
    height: calc(100vh - 37px);
    margin: 29px 42px 8px;
    border-radius: 4px;
    border: 1px solid ${({ theme }) => theme.colors.inputGray};
`;

export const StyledMainLayout = styled.div`
    display: grid;
    grid-template-columns: 1fr 2fr;
    height: 100%;
`;

export const StyledMainAside = styled.aside`
    border-right: 1px solid ${({ theme }) => theme.colors.inputGray};
    height: 100%;
`;

export const StyledMainAsideTopbar = styled.div`
    margin: 20px 24px 25px;
    display: grid;
    grid-template-columns: max-content 1fr;
    align-items: center;
    gap: 26px;
`;

export const StyledChatCard = styled(UserCard)`
    margin-bottom: 8px;
`;
