import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyle = createGlobalStyle`
  ${reset}
  body{
    background-color:#222831;
    overflow-x:hidden;
  }
  h1{
    font-size:2em;
  }
  font-family: 'Nunito', sans-serif;

  p,h1,h2,h3,h4,span,a{
    font-family: 'Nunito', sans-serif;
    ${"" /* color:#eeeeee; */}
  }

  `;

export default GlobalStyle;
