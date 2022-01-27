import styled from 'styled-components';

export const StyledInput = styled.div`
    position: relative;
`;

interface IStyledInputElementProps {
    errored?: boolean;
}

export const StyledInputElement = styled.input<IStyledInputElementProps>`
    box-sizing: border-box;
    height: 40px;
    width: 100%;
    border-radius: 4px;
    border: 1px solid
        ${({ errored, theme }) =>
            errored ? theme.colors.red : theme.colors.inputGray};
    padding: 0 16px;
    font: ${({ theme }) => theme.fonts.i400f14l20};
    color: ${({ theme }) => theme.colors.textBlack};
    :focus {
        border-color: ${({ theme }) => theme.colors.blue};
        outline: none;
    }

    :focus-visible {
        outline: none;
    }

    ::placeholder {
        color: ${({ theme }) => theme.colors.gray};
    }
`;

export const StyledInputError = styled.span`
    position: absolute;
    top: 44px;
    font: ${({ theme }) => theme.fonts.i400f12l16};
    color: ${({ theme }) => theme.colors.red};
`;

export const StyledInputIconRight = styled.img`
    position: absolute;
    right: 20px;
    top: 50%;
    transform: translateY(-50%);
`;
