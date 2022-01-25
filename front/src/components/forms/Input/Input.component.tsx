import React, { InputHTMLAttributes } from 'react';
import {
    StyledInput,
    StyledInputElement,
    StyledInputError,
} from './Input.component.styled';

interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
    error?: string;
}

export const Input = React.forwardRef<HTMLInputElement, IInputProps>(
    ({ error, className, ...restProps }, ref) => {
        const inputProps = {
            ...restProps,
            children: undefined,
        };
        return (
            <StyledInput className={className}>
                <StyledInputElement
                    ref={ref}
                    {...inputProps}
                    errored={Boolean(error)}
                />
                {error && <StyledInputError>{error}</StyledInputError>}
            </StyledInput>
        );
    },
);
