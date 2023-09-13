import { Input, Title, WarningContent, WarningWrap } from "@/styles/auth/auth.style";
import { BackBtn, BehindWrap, Flip, Left, Mid, Right,StyledHiddenPalette, StyledShowPalette, ToggleTheme } from "@/styles/bookshape/closedbook.style";
import { CommonEmptyBtn, CommonFilledBtn, CommonOutlinedBtn } from "@/styles/common.style";
import { Aiary, ButtonWrap, Content, Logo } from "@/styles/main/main.style";
import { createGlobalStyle, ThemeProps } from "styled-components";
import reset from 'styled-reset';
import { BookContainer, OpenBookLeft, OpenBookRight, Line, Profile } from "@/styles/bookshape/opendbook.style";
import { HeaderYear,HeaderDate,WeekWrap,DaysCol,IconWrap,ListEmoji, NonDiaryContainer, GotoDiaryWrite, ArrowBackIcon, ArrowForwardIcon, PlusCircle} from "@/styles/diary/diarylist.style";
import { DateContainer,DateContent,WeatherWrap, StyledSunny, StyledCloudy, StyledRainy, StyledSnow, TitleContainer, Title, Titlecontent, Emoji, Canvas, TableTd, StyledShare, StyledDelete, ButtonItem  } from "@/styles/diary/diary.style";
import { EmojiWrap, Modebutton,Savebutton, Choicetitle } from "@/styles/diary/diarywrite.style";
import { SearchWrap,SearchDate,SearchContentContainer, SearchTitleWrap, SearchContent } from "@/styles/diary/diarysearch.style";
import {StyledNavLink} from '@/components/bookshape/Bookmark';
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
    ${BehindWrap} {
      height : 624px;
      margin-left : 90px;
    }
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
    ${BookContainer}{
      height: 624px;
    }
    ${OpenBookLeft} {
      width: 580px;
      border-width: 0  0 8px 8px;
    }
    ${OpenBookRight}{
      width: 580px;
      border-width: 0 8px 8px 0 ;
    }
    ${Line}{
      width: 8px;
    }
    ${ArrowBackIcon}{
      font-size: 26px;
    }
    ${ArrowForwardIcon}{
      font-size: 26px;
    }
    ${HeaderYear}{
      font-size: 18px;
    }
    ${HeaderDate}{
      > p {
        font-size: 44px;
      }
    }
    ${WeekWrap}{
      > p { 
        font-size: 20px;
      }
    }
    ${DaysCol}{
      font-size: 18px;
    }
    ${IconWrap}{
      margin-top: 3px;
    }
    ${PlusCircle}{
      font-size: 30px;
    }
    ${ListEmoji}{
      margin-top: 3px;
      font-size: 30px;
    }
    ${NonDiaryContainer}{
      > img {
        margin-bottom: 30px;
      }
      > div {
        font-size: 44px;
        margin-bottom: 30px;
      }
    }
    ${GotoDiaryWrite}{
      font-size: 28px;
    }
    ${DateContainer}{
      padding: 5px 12px;
    }
    ${DateContent}{
      font-size: 21px;
    }
    ${WeatherWrap}{
      .weather{
        margin-right: 12px;
      }
    }
    ${StyledSunny}{
      width: 28px;
      height: 28px;
    }
    ${StyledCloudy}{
      width: 28px;
      height: 28px;
    }
    ${StyledRainy}{
      width: 28px;
      height: 28px;
    }
    ${StyledSnow}{
      width: 28px;
      height: 28px;
    }
    ${TitleContainer}{
      padding: 5px 12px;
    }
    ${Title}{
      font-size: 21px;
    }
    ${Titlecontent}{
      > input {
        width: 360px;
        font-size: 21px;
      }
    }
    ${Emoji}{
      font-size: 26px;
    }
    ${EmojiWrap}{
      top: 110px;
    }
    ${Modebutton}{
      padding: 5px 3px;
      width: 90px;
      font-size: 13px;
    }
    ${Savebutton}{
      width: 100px;
      padding: 6px 3px;
      font-size: 14px;
    }
    ${Canvas}{
      height: 250px;
    }
    ${TableTd}{
      font-size: 21px;
    }
    ${StyledShare}{
      width: 37px;
      height: 37px;
    }
    ${StyledDelete}{
      width: 37px;
      height: 37px;
    }
    ${StyledNavLink}{
      width : 75px;
      height : 53px;
      margin-bottom: 13px;
      font-size: 16px;
    }
    ${Choicetitle}{
      font-size: 30px;
    }
    ${SearchWrap}{
      padding: 15px 0;
      > hr {
        margin: 0 15px;
      }
    }
    ${SearchDate}{
      > h2 {
        font-size: 28px;
      }
      > div {
        font-size: 15px;
      }
    }
    ${SearchTitleWrap}{
      margin-bottom: 3px;
      > div {
        font-size: 26px;
        margin-right: 10px;
      }
      > p {
        font-size: 22px;
      }
    }
    ${SearchContentContainer}{
      padding: 0 5px;
    }
    ${SearchContent}{
      font-size: 15px;
    }
    ${Profile} {
      width: 208px;
      height : 208px;
    }
  }

  @media screen and (max-width: 1180px), screen and (max-height: 680px) {
    ${BehindWrap} {
      height : 546px;
    }
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
    ${BookContainer}{
      height: 546px;
    }
    ${OpenBookLeft} {
      width: 500px;
      border-width: 0  0 6px 6px;
    }
    ${OpenBookRight}{
      width: 500px;
      border-width: 0 6px 6px 0 ;
    }
    ${Line}{
      width: 6px;
    }
    ${ArrowBackIcon}{
      font-size: 24px;
    }
    ${ArrowForwardIcon}{
      font-size: 24px;
    }
    ${HeaderYear}{
      font-size: 16px;
    }
    ${HeaderDate}{
      > p {
        font-size: 36px;
      }
    }
    ${WeekWrap}{
      > p { 
        font-size: 16px;
      }
    }
    ${DaysCol}{
      font-size: 16px;
    }
    ${IconWrap}{
      margin-top: 2px;
    }
    ${PlusCircle}{
      font-size: 25px;
    }
    ${ListEmoji}{
      font-size: 25px;
      margin-top: 2px;
    }
    ${NonDiaryContainer}{
      > img {
        margin-bottom: 20px;
      }
      > div {
        font-size: 36px;
        margin-bottom: 20px;
      }
    }
    ${GotoDiaryWrite}{
      font-size: 20px;
      padding: 13px 25px;
    }
    ${DateContainer}{
      padding: 5px 12px;
    }
    ${DateContent}{
      font-size: 16px;
    }
    ${WeatherWrap}{
      .weather{
        margin-right: 10px;
      }
    }
    ${StyledSunny}{
      width: 22px;
      height: 22px;
    }
    ${StyledCloudy}{
      width: 22px;
      height: 22px;
    }
    ${StyledRainy}{
      width: 22px;
      height: 22px;
    }
    ${StyledSnow}{
      width: 22px;
      height: 22px;
    }
    ${TitleContainer}{
      padding: 5px 12px;
    }
    ${Title}{
      font-size: 16px;
    }
    ${Titlecontent}{
      > input {
        width: 300px;
        font-size: 16px;
      }
    }
    ${Emoji}{
      font-size: 24px;
    }
    ${EmojiWrap}{
      top: 95px;
    }
    ${Modebutton}{
      padding: 5px 3px;
      width: 73px;
      font-size: 11px;
    }
    ${Savebutton}{
      width: 90px;
      padding: 6px 3px;
      font-size: 12px;
    }
    ${Canvas}{
      height: 230px;
    }
    ${TableTd}{
      font-size: 16px;
    }
    ${ButtonItem}{
      margin-right: 7px;
    }
    ${StyledShare}{
      width: 33px;
      height: 33px;
    }
    ${StyledDelete}{
      width: 33px;
      height: 33px;
    }
    ${StyledNavLink}{
      width : 65px;
      height : 48px;
      margin-bottom: 12px;
      font-size: 14px;
    }
    ${Choicetitle}{
      font-size: 28px;
    }
    ${SearchWrap}{
      padding: 15px 5px;
      > hr {
        margin: 0 18px;
      }
    }
    ${SearchDate}{
      > h2 {
        font-size: 28px;
      }
      > div {
        font-size: 15px;
      }
    }
    ${SearchTitleWrap}{
      margin-bottom: 3px;
      > div {
        font-size: 26px;
        margin-right: 10px;
      }
      > p {
        font-size: 22px;
      }
    }
    ${SearchContentContainer}{
      padding: 0 5px;
    }
    ${SearchContent}{
      font-size: 15px;
    }
    ${Profile} {
      width: 182px;
      height : 182px;
  }

    @media screen and (max-width: 1050px), screen and (max-height: 550px) {
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