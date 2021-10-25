import { ThemeColors } from './Theme.constant';

export enum ThemeVariant {
    Default = 'default',
}

export const ThemesProps: Record<ThemeVariant, typeof ThemeColors> = {
    [ThemeVariant.Default]: ThemeColors,
};

export type ThemePropsType = typeof ThemesProps[keyof typeof ThemesProps];
