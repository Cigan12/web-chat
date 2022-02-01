import { ThemePropsType } from '../theme/Theme.types';

declare module 'styled-components' {
    // eslint-disable-next-line
    export interface DefaultTheme extends ThemePropsType {}
}
