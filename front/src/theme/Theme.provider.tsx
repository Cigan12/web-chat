import React from 'react';
import { ThemeProvider } from 'styled-components';
import { ITheme } from './Theme.types';
import { ThemeColors } from './ThemeColors.constant';
import { ThemeFonts } from './ThemeFonts.constant';

export const GlobalThemeProvider: React.FC = ({ children }) => {
    const theme: ITheme = {
        colors: ThemeColors,
        fonts: ThemeFonts,
    };

    return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};
