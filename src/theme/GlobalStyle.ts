import { createGlobalStyle, ThemeProps } from "styled-components";
import reset from 'styled-reset';

type DefaultTheme = {
  bgImg?: string;
  bgColor?: string;
};

export const GlobalStyle = createGlobalStyle`
  ${reset}
  @font-face {
    font-family: 'KyoboHand';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_20-04@1.0/KyoboHand.woff') format('woff');
    font-weight: normal;
    font-style: normal;
  }
  html, body{
    margin: 0;
    height:100vh;
    width: 100vw;
    padding: 0;
    font-family: 'KyoboHand';
  }
  body{
    overflow: hidden;
    fontFamily:'KyoboHand';
    background-image: url(${(props:ThemeProps<DefaultTheme>)=> props.theme.bgImg});
    background-color: ${props => props.theme.bgColor}; 
    background-repeat: no-repeat;
    background-size: cover;
  }
  .link {
    width:30.5%;
    font-size: 45px;
    color: black;
    text-decoration-line: none;
  }

`;