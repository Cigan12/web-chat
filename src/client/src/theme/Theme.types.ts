import { ThemeColors } from './ThemeColors.constant';
import { ThemeFonts } from './ThemeFonts.constant';

export enum ThemeVariant {
    Default = 'default',
}

export interface ITheme {
    colors: typeof ThemeColors;
    fonts: typeof ThemeFonts;
}

export const ThemesProps: Record<ThemeVariant, ITheme> = {
    [ThemeVariant.Default]: { colors: ThemeColors, fonts: ThemeFonts },
};

export type ThemePropsType = typeof ThemesProps[keyof typeof ThemesProps];
