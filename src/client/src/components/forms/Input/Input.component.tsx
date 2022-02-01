import React, { InputHTMLAttributes } from 'react';
import {
    StyledInput,
    StyledInputElement,
    StyledInputError,
    StyledInputIconRight,
} from './Input.component.styled';

interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
    error?: string;
    iconRight?: string;
}

export const Input = React.forwardRef<HTMLInputElement, IInputProps>(
    ({ error, className, iconRight, ...restProps }, ref) => {
        return (
            <StyledInput className={className}>
                <StyledInputElement
                    ref={ref}
                    {...restProps}
                    errored={Boolean(error)}
                />
                {iconRight && (
                    <StyledInputIconRight src={iconRight} alt="icon-right" />
                )}
                {error && <StyledInputError>{error}</StyledInputError>}
            </StyledInput>
        );
    },
);
