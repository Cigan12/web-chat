import React, { LabelHTMLAttributes } from 'react';
import { StyledLabel } from './Label.component.styled';

export const Label: React.FC<LabelHTMLAttributes<HTMLLabelElement>> = ({
    children,
    ...rest
}) => {
    return <StyledLabel {...rest}>{children}</StyledLabel>;
};
