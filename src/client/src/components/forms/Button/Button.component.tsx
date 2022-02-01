import React, { ButtonHTMLAttributes } from 'react';
import { StyledButton } from './Button.component.styled';

export const Button: React.FC<ButtonHTMLAttributes<HTMLButtonElement>> = ({
    children,
    ...restProps
}) => {
    return <StyledButton {...restProps}>{children}</StyledButton>;
};
