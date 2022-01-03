import styled from 'styled-components';

export const StyledMainView = styled.div`
    background-color: ${({ theme }) => theme.white};
    height: 100vh;
`;

export const StyledMainLayout = styled.div`
    display: grid;
    grid-template-columns: 1fr 9fr;
`;
