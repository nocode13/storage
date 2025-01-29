import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  html {
    min-height: 100dvh;
    height: 100%;
  }

  body {
    padding: 0;
    margin: 0;
    font-family: 'Inter Variable', sans-serif;
    height: inherit;
  }

  #root {
    height: inherit;
  }
`;
