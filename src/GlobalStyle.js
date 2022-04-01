import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`

  *{
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    scroll-behaviour: smooth;
  }

  :root {
    --ff-primary:'Karla', sans-serif;
    --ff-secondary: 'Inter', sans-serif;

    --fw-reg: 400;
    --fw-med: 500;
    --fw-semibold: 600;
    --fw-bold: 700;
    
    --clr-body-bg: #F5F7FB;
    --clr-highlight-primary: #D6DBF5;
    --clr-highlight-secondary: #94D7A2;
    --clr-highlight-tertiary: #F8BCBC;
    --clr-button-bg: #4D5B9E;
    --clr-button-text: #F5F7FB;
    --clr-primary-text: #293264;
    --clr-white: #FFFFFF;
  }

  body {
    font-family: var(--ff-primary);
    color: var(--clr-primary-text);
  }

  .btn, button, input {
    font: inherit;
  }


`;