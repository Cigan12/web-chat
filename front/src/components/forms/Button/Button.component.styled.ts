import styled from 'styled-components';

export const StyledButton = styled.button`
    background: ${({ theme }) => theme.colors.blue};
    border-radius: 4px;
    color: ${({ theme }) => theme.colors.white};
    font: ${({ theme }) => theme.fonts.i500f16l20};
    height: 40px;
    border: none;
    cursor: pointer;
    :disabled {
        opacity: 0.5;
    }
`;
