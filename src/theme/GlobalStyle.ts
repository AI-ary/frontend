import { Input, Title, WarningContent, WarningWrap } from "@/styles/auth/auth.style";
import { BackBtn, Flip, Left, Mid, Right,StyledHiddenPalette, StyledShowPalette, ToggleTheme } from "@/styles/bookshape/closedbook.style";
import { CommonEmptyBtn, CommonFilledBtn, CommonOutlinedBtn } from "@/styles/common.style";
import { Aiary, ButtonWrap, Content, Logo } from "@/styles/main/main.style";
import { createGlobalStyle, ThemeProps } from "styled-components";
import reset from 'styled-reset';

type DefaultTheme = {
  bgImg?: string;
  bgColor?: string;
  fontColor?: string;
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
    font-family:'KyoboHand';
    background-image: url(${(props:ThemeProps<DefaultTheme>)=> props.theme.bgImg});
    background-color: ${props => props.theme.bgColor}; 
    background-repeat: no-repeat;
    background-size: cover;
    color: ${props => props.theme.fontColor};
  }
  .link {
    width:30.5%;
    font-size: 45px;
    color: black;
    text-decoration-line: none;
  }

    @media screen and (max-width: 1440px), screen and (max-height: 830px) {

      ${Left} {
        width: 44px;
        height : 624px;
        border-radius : 6px 0px 0px 6px;
      }
      ${Flip} {
        height: 624px;
      }
      ${Mid} {
        width : 556px;
        height : 624px;
        padding : 51px 0px;
      }
      ${Right} {
        width : 8px;
        height : 624px;
        border-radius : 0px 6px 6px 0px;
      }
      ${BackBtn} {
        width : 44px;
        height : 44px;
        padding-right : 4px;
        margin : 28px 0px 0px 28px;
      }
      ${Content} {
        font-size : 25px;
      }
      ${Aiary} {
        width : 272px;
        height : 120px;
      }
      ${Logo} {
        width : 352px;
        height : 304px;
      }
      ${ButtonWrap} {
        margin-bottom : 51px;
      }
      ${CommonFilledBtn} {
        padding : 9px 28px;
        font-size : 25px;
        border-radius : 28px;
      }
      ${CommonOutlinedBtn} {
        padding : 9px 28px;
        font-size : 25px;
        border-radius : 28px;
      }
      ${CommonEmptyBtn} {
        padding : 9px 28px;
        font-size : 25px;
        border-radius : 28px;
      }
      ${Title} {
        font-size : 64px;
      }
      ${Input} {
        width : 460px;
        border-radius : 9px;
        padding : 14px 16px;
        font-size : 16px;
      }
      ${WarningWrap} {
        height:16px;
        font-size : 12px;
      }
      ${WarningContent} {
        margin : 0px 3px;
        font-size : 12px;
      }
    }

    @media screen and (max-width: 1180px), screen and (max-height: 680px) {

      ${Left} {
        width:38px;
        height : 546px;
        border-radius : 5px 0px 0px 5px;
      }
      ${Flip} {
        height: 546px;
      }
      ${Mid} {
        width : 486px;
        height : 546px;
        padding : 44px 0px;
      }
      ${Right} {
        width : 7px;
        height : 546px;
        border-radius : 0px 5px 5px 0px;
      }
      ${BackBtn} {
        width : 38px;
        height : 38px;
        padding-right : 3px;
        margin : 24px 0px 0px 24px;
      }
      ${Content} {
        font-size : 22px;
      }
      ${Aiary} {
        width : 238px;
        height : 105px;
      }
      ${Logo} {
        width : 308px;
        height : 266px;
      }
      ${ButtonWrap} {
        margin-bottom : 44px;
      }
      ${CommonFilledBtn} {
        padding : 8px 25px;
        font-size : 22px;
        border-radius : 25px;
      }
      ${CommonOutlinedBtn} {
        padding : 8px 25px;
        font-size : 22px;
        border-radius : 25px;
      }
      ${CommonEmptyBtn} {
        padding : 9px 28px;
        font-size : 25px;
        border-radius : 28px;
      }
      ${Title} {
        font-size : 56px;
      }
      ${Input} {
        width : 402px;
        border-radius : 8px;
        padding : 12px 14px;
        font-size : 14px;
      }
      ${WarningWrap} {
        height:14px;
        font-size : 11px;
      }
      ${WarningContent} {
        margin : 0px 2px;
        font-size : 11px;
      }
      ${StyledHiddenPalette}{
        width: 90px;
        height: 90px;
      }
      ${StyledShowPalette}{
        width: 90px;
        height: 90px;
      }
      ${ToggleTheme}{
        height: 220px;
        left: 70px;
        > li {
          width: 80px;
          height: 80px;
        }
        > li:nth-child(2){
          margin-left: 40px;
        }
      }
    
    }

    @media screen and (max-width: 1100px), screen and (max-height: 600px) {
      #root {
          display: none;
      }
      #help {
          color: black;
          display: flex;
          height: 100vh;
          justify-content: center;
          align-items: center;
          font-size: 50px;
          font-weight: bold;
      }
    }

`;