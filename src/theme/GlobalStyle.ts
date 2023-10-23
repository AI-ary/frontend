import { Input, PageTitle, WarningContent, WarningWrap } from "@/styles/auth/auth.style";
import { BackBtn, BehindWrap, Flip, Left, Mid, Right,StyledHiddenPalette, StyledShowPalette, ToggleTheme } from "@/styles/bookshape/closedbook.style";
import { CommonEmptyBtn, CommonFilledBtn, CommonOutlinedBtn } from "@/styles/common.style";
import { Aiary, ButtonWrap, Content, Logo } from "@/styles/main/main.style";
import { createGlobalStyle } from "styled-components";
import reset from 'styled-reset';
import { BookContainer, OpenBookLeft, OpenBookRight, Line, Profile, SelectBtn } from "@/styles/bookshape/opendbook.style";
import { HeaderYear,HeaderDate,WeekWrap,DaysCol,IconWrap,ListEmoji, NonDiaryContainer, GotoDiaryWrite, ArrowBackIcon, ArrowForwardIcon, PlusCircle} from "@/styles/diary/diarylist.style";
import { DateContainer,DateContent,WeatherWrap, StyledSunny, StyledCloudy, StyledRainy, StyledSnow, TitleContainer, Title, Titlecontent, Emoji, Canvas, TableTd, StyledShare, StyledDelete, ButtonItem  } from "@/styles/diary/diary.style";
import { DrawingBtnWrap, EmojiWrap, Modebutton,Savebutton, Choicetitle, ChoiceKeyword, Arrow, Keyword, DalleTitle, DalleGrim } from "@/styles/diary/diarywrite.style";
import { SearchWrap,SearchDate,SearchContentContainer, SearchTitleWrap, SearchContent } from "@/styles/diary/diarysearch.style";
import { StyledNavLink } from '@/components/bookshape/Bookmark';
import { GuideContainer, GuideContent, GuideImgKonlpy, GuideImgRealDiary, GuideImgTheme, GuideNum, GuideTitle, GuideTitleWrap } from "@/styles/introduce.style";

type DefaultTheme = {
  bgImg?: string;
  bgColor?: string;
  fontColor?: string;
};

type ThemeProps = {
    theme: DefaultTheme;
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
    background-image: url(${(props:ThemeProps)=> props.theme.bgImg});
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
    ${PageTitle} {
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
    ${DalleTitle}{
      font-size: 30px;
    }
    ${DalleGrim}{
      width: 45%;
      height: 155px;
      &:first-child{
        margin-right: 35px;
      }
      &:last-child{
        margin-left: 35px;
      }
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
    ${SelectBtn} {
      top: -64px;
      left: 72px;
      padding: 14px;
      .profile {
        font-size : 22px;
      }
    }
    ${GuideContainer} {
      padding: 48px;
    }
    ${GuideTitle} {
      font-size: 25px;
    }
    ${GuideTitleWrap} {
      margin-bottom: 8px;
      font-size: 19px;
    }
    ${GuideNum} {
      width: 22px;
      height: 22px;
      margin-right: 8px;
      font-size: 12px;
    }
    ${GuideContent} {
      font-size: 14px;
      line-height: 19px;
    }
    ${GuideImgKonlpy}, ${GuideImgTheme}, ${GuideImgRealDiary} {
      margin-top: 8px;
    }
  }

  @media screen and (max-width: 1024px), screen and (max-height: 680px) {
    ${BehindWrap} {
      height : 468px;
      width:476px;
    }
    ${Left} {
      width:33px;
      height : 468px;
      border-radius : 4px 0px 0px 4px;
    }
    ${Flip} {
      height: 468px;
    }
    ${Mid} {
      width : 417px;
      height : 468px;
      padding : 38px 0px;
    }
    ${Right} {
      width : 6px;
      height : 468px;
      border-radius : 0px 4px 4px 0px;
    }
    ${BackBtn} {
      width : 33px;
      height : 33px;
      padding-right : 3px;
      margin : 21px 0px 0px 21px;
    }
    ${Content} {
        font-size : 19px;
    }
    ${Aiary} {
      width : 204px;
      height : 90px;
    }
    ${Logo} {
      width : 264px;
      height : 228px;
    }
    ${ButtonWrap} {
      margin-bottom : 38px;
    }
    ${CommonFilledBtn}, ${CommonOutlinedBtn}, ${CommonEmptyBtn} {
      padding : 7px 21px;
      font-size : 19px;
      border-radius : 21px;
    }
    ${PageTitle} {
      font-size : 48px;
    }
    ${Input} {
      width : 345px;
      border-radius : 7px;
      padding : 10px 12px;
      font-size : 12px;
    }
    ${WarningWrap} {
      height:12px;
    }
    ${WarningContent} {
      margin : 0px 2px;
      font-size : 11px;
    }
    ${StyledHiddenPalette}, ${StyledShowPalette} {
      width: 77px;
      height: 77px;
    }
    ${ToggleTheme}{
      height: 188px;
      left: 60px;
      > li {
        width: 68px;
        height: 68px;
      }
      > li:nth-child(2){
        margin-left: 34px;
      }
    }
    ${BookContainer}{
      height: 468px;
    }
    ${OpenBookLeft} {
      width: 428px;
      border-width: 0  0 5px 5px;
    }
    ${OpenBookRight}{
      width: 428px;
      border-width: 0 5px 5px 0 ;
    }
    ${Line}{
      width: 5px;
    }
    ${ArrowBackIcon}, ${ArrowForwardIcon} {
      font-size: 20px;
    }
    ${HeaderYear}{
      font-size: 13px;
    }
    ${HeaderDate}{
      > p {
        font-size: 30px;
      }
    }
    ${WeekWrap}{
      > p { 
        font-size: 13px;
      }
    }
    ${DaysCol}{
      font-size: 13px;
    }
    ${IconWrap}{
      margin-top: 1px;
    }
    ${PlusCircle}{
      font-size: 21px;
    }
    ${ListEmoji}{
      font-size: 21px;
      margin-top: 1px;
    }
    ${NonDiaryContainer}{
      > img {
        margin-bottom: 17px;
      }
      > div {
        font-size: 30px;
        margin-bottom: 17px;
      }
    }
    ${GotoDiaryWrite}{
      font-size: 17px;
      padding: 11px 21px;
    }
    ${DateContainer}{
      padding: 4px 10px;
    }
    ${DateContent}{
      font-size: 13px;
    }
    ${WeatherWrap}{
      .weather{
        margin-right: 8px;
      }
    }
    ${StyledSunny}, ${StyledCloudy}, ${StyledRainy}, ${StyledSnow}{
      width: 18px;
      height: 18px;
    }
    ${TitleContainer}{
      padding: 4px 10px;
    }
    ${Title}{
      font-size: 13px;
    }
    ${Titlecontent}{
      > input {
        width: 128px;
        font-size: 13px;
      }
    }
    ${Emoji}{
      font-size: 20px;
    }
    ${EmojiWrap}{
      top: 81px;
    }
    ${Modebutton}{
      padding: 4px 3px;
      width: 70px;
      font-size: 8px;
    }
    ${Savebutton}{
      width: 77px;
      padding: 5px 2px;
      font-size: 10px;
    }
    ${Canvas}{
      height: 197px;
    }
    ${TableTd}{
      font-size: 13px;
    }
    ${ButtonItem}{
      margin-right: 6px;
    }
    ${StyledShare}, ${StyledDelete}{
      width: 28px;
      height: 28px;
    }
    ${StyledNavLink}{
      width : 55px;
      height : 41px;
      margin-bottom: 10px;
      font-size: 12px;
    }
    ${DrawingBtnWrap}{
      bottom: 10px;
      left: 10px;
      .custom-button{
        margin-right: 7px;
        font-size: 16px;
      }
      img {
        width: 18px;
        height: 18px;
        margin-right: 6px;
      }
    }
    ${Choicetitle}{
      font-size: 24px;
    }
    ${ChoiceKeyword}{
      height: 30px;
    }
    ${Arrow}{
      width: 24px;
      height: 24px;
      &.left { 
        right: 40px;
      }
      &.right {
        right: 10px;
      }
    }
    ${Keyword}{
      > p {
        font-size: 14px;
      }
    }
    ${DalleTitle}{
      font-size: 24px;
    }
    ${DalleGrim}{
      width: 45%;
      height: 120px;
      &:first-child{
        margin-right: 25px;
      }
      &:last-child{
        margin-left: 25px;
      }
    }
    ${SearchWrap}{
      padding: 12px 4px;
      > hr {
        margin: 0 15px;
      }
    }
    ${SearchDate}{
      > h2 {
        font-size: 24px;
      }
      > div {
        font-size: 12px;
      }
    }
    ${SearchTitleWrap}{
      margin-bottom: 2px;
      > div {
        font-size: 22px;
        margin-right: 8px;
      }
      > p {
        font-size: 18px;
      }
    }
    ${SearchContentContainer}{
      padding: 0 4px;
    }
    ${SearchContent}{
      font-size: 12px;
    }
    ${Profile} {
      width: 156px;
      height : 156px;
    }
    ${SelectBtn} {
      top: -54px;
      left: 61px;
      padding: 12px;
      .profile {
        font-size : 16px;
      }
    }
    ${GuideContainer} {
      padding: 36px;
    }
    ${GuideTitle} {
      font-size: 18px;
    }
    ${GuideTitleWrap} {
      margin-bottom: 6px;
      font-size: 14px;
    }
    ${GuideNum} {
      width: 16px;
      height: 16px;
      margin-right: 6px;
      font-size: 9px;
    }
    ${GuideContent} {
      font-size: 10px;
      line-height: 10px;
    }
    ${GuideImgKonlpy}, ${GuideImgTheme}, ${GuideImgRealDiary} {
      margin-top: 6px;
    }
  }

    @media screen and (max-width: 768px), screen and (max-height: 550px) {
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