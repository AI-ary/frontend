import { createGlobalStyle, ThemeProps } from "styled-components";
import reset from 'styled-reset';
import { BookContainer, OpenBookLeft, OpenBookRight, Line } from "@/styles/bookshape/opendbook.style";
import { HeaderYear,HeaderDate,WeekWrap,DaysCol,IconWrap,ListEmoji, NonDiaryContainer, GotoDiaryWrite, ArrowBackIcon, ArrowForwardIcon, PlusCircle} from "@/styles/diary/diarylist.style";
import { DateContainer,DateContent,WeatherWrap, StyledSunny, StyledCloudy, StyledRainy, StyledSnow, TitleContainer, Title, Titlecontent, Emoji, Canvas, TableTd, StyledShare, StyledUpdate, ButtonItem  } from "@/styles/diary/diary.style";
import { EmojiWrap, Modebutton,Savebutton  } from "@/styles/diary/diarywrite.style";
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
      width: 48.4px;
      height: 44.3px;
      font-size: 21px;
    }
    ${StyledShare}{
      width: 37px;
      height: 37px;
    }
    ${StyledUpdate}{
      width: 37px;
      height: 37px;
    }
    ${StyledNavLink}{
      width : 75px;
      height : 53px;
      margin-bottom: 13px;
      font-size: 16px;
    }
  }

  @media screen and (max-width: 1180px), screen and (max-height: 680px) {
    ${BookContainer}{
      height: 560px;
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
      width: 41.8px;
      height: 39.1px;
      font-size: 16px;
    }
    ${ButtonItem}{
      margin-right: 7px;
    }
    ${StyledShare}{
      width: 33px;
      height: 33px;
    }
    ${StyledUpdate}{
      width: 33px;
      height: 33px;
    }
    ${StyledNavLink}{
      width : 65px;
      height : 48px;
      margin-bottom: 12px;
      font-size: 14px;
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