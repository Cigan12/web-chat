import { createGlobalStyle } from 'styled-components';
import InterRegular from 'assets/fonts/Inter/Inter-Regular.woff2';
import InterMedium from 'assets/fonts/Inter/Inter-Medium.woff2';
import InterSemiBold from 'assets/fonts/Inter/Inter-SemiBold.woff2';
import InterBold from 'assets/fonts/Inter/Inter-Bold.woff2';

export const GlobalStyle = createGlobalStyle`
@font-face {
    font-family: 'Inter';
    src: url(${InterRegular});
    font-display: swap;
    font-weight: 400;
    font-style: normal;
}

@font-face {
    font-family: 'Inter';
    src: url(${InterMedium});
    font-display: swap;
    font-weight: 500;
    font-style: normal;
}

@font-face {
    font-family: 'Inter';
    src: url(${InterSemiBold});
    font-display: swap;
    font-weight: 600;
    font-style: normal;
}

@font-face {
    font-family: 'Inter';
    src: url(${InterBold});
    font-display: swap;
    font-weight: 700;
    font-style: normal;
}
body {
    font-family: Inter;
    margin:  0;
}

* {
    box-sizing: border-box;
}
`;
