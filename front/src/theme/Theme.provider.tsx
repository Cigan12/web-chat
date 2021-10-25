import React from 'react';
import { ThemeProvider } from 'styled-components';
import { ThemeColors } from './Theme.constant';

export const GlobalThemeProvider: React.FC = ({ children }) => {
    return <ThemeProvider theme={ThemeColors}>{children}</ThemeProvider>;
};
