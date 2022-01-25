import { Button } from 'components/forms/Button/Button.component';
import { Input } from 'components/forms/Input/Input.component';
import styled from 'styled-components';

export const StyledAuthModal = styled.div`
    width: 355px;
    background: ${({ theme }) => theme.colors.white};
    border-radius: 4px;
    padding: 24px 40px 32px;
`;

export const StyledAuthModalInput = styled(Input)`
    margin-top: 12px;
    margin-bottom: 20px;
    width: 100%;
`;

export const StyledAuthModalFields = styled.div`
    margin-top: 32px;
`;

export const StyledAuthModalButton = styled(Button)`
    width: 100%;
    margin-top: 12px;
`;

export const StyledAuthModalLogo = styled.img`
    display: flex;
    margin: 0 auto;
`;

export const StyledAuthModalChangeModalButton = styled.button`
    font: ${({ theme }) => theme.fonts.i500f12l20};
    color: ${({ theme }) => theme.colors.boldGray};
    border: none;
    background: none;
    margin: 8px auto 0;
    display: flex;
    cursor: pointer;
`;
