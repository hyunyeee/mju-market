import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyle = createGlobalStyle`
  ${reset}
  *, body {
    margin: 0;
    padding: 0;
    font-family: 'Pretendard', sans-serif;
    box-sizing: border-box;
  }
  button {
    margin: 0;
    padding: 0;
    border: none;
    cursor: pointer;
    background-color: transparent;
  }
  input{
    margin: 0;
    padding: 0;
    border: none;
    background-color: transparent;
  }
  input:focus, textarea:focus {
    outline: none;
  }
`;

export default GlobalStyle;
