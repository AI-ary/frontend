import styled, { keyframes } from 'styled-components';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

interface KeywordProps {
  isSelected: boolean;
}
interface ChoiceProps {
  isKeywordList: boolean;
}

interface CursorProps {
  idx: number;
  cursor: number;
}

export const GridContent =styled.textarea`
  position: absolute;
  width:85%;
  height: 35%;
  background-color: rgba(0, 0, 0, 0);
  z-index: 20;
  word-break: break-all;
  resize: none;
  border: none;
  outline: none;
  caret-color: transparent;
  color: transparent;
  text-decoration-line: none;
  top: -800px;
`

/*버튼 컨테이너(그림 편집)*/
export const ButtonContainer = styled.div`
  width: 100%;
  position: absolute;
  bottom: 10px;
  padding: 0 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Modebutton = styled.button`
  border-radius: 24px;
  font-size: 16px;
  font-family: 'Poor Story';
  -webkit-text-stroke: 0.4px #6A6A6A;
  text-align: center;
  color: #6A6A6A;
  background-color: transparent;
  margin-right: 5px;
  border: 2px solid #6A6A6A;
  transition: box-shadow 250ms ease-in-out, color 200ms ease-in-out;
  padding: 6px 14px;
  box-sizing: border-box;
  &:hover {
    box-shadow: 0 0 30px 30px #404040 inset;
    color: white;
    border: none;
  }
`;

export const Savebutton = styled.button`
  background-color: #EB8888;
  background-color: ${props => props.theme.btnColor};
  color: #FFFFFF;
  border-radius: 24px;
  text-align: center;
  border: none;
  margin-left: auto;
  font-size: 18px;
  font-family: 'Poor Story';
  transition: box-shadow, color 300ms ease-in-out;
  padding: 8px 16px;
  box-sizing: border-box;
  box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
  &:hover {
    background-color: ${props => props.theme.btnHover};
  }
`;

export const EmojiWrap = styled.div`
  position: absolute;
  top: 130px;
  right: 50px;
  z-index: 100;
`

export const DrawingBtnWrap = styled.div`
  position: absolute;
  bottom: 15px;
  left: 15px;
  display: flex;
  z-index: 100;
  .custom-button{
    margin-right: 8px;
    font-size: 24px;
  }
  > img {
    margin-right: 10px;
  }
`

export const Choicetitle =styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  font-size: 36px;
  font-family: 'Poor Story';
  -webkit-text-stroke: 0.4px #373737;
  color: #373737;
  margin-bottom: 25px;
`

export const ChoiceWrap = styled.div`
  width: 85%;   
  height: 80%;
  display: flex;
  flex-direction: column;
  jusitfy-content: space-between;
  align-items: center;
`

export const ChoiceKeyword = styled.div`
  width: 100%;
  height: 44px;
`

export const StyledSlider = styled(Slider)`
  height: 100%;
  min-height: 1px;
  .slick-list{
    height: 100%;
    width: 80%;
  }
  .slick-track{
    height: 100%;
    margin: 0px;
  }
  .slick-slide {
    height: 100%;
    > div{
      height: 100%;
    }
  }
`

export const Arrow = styled.p`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: ${props => props.theme.btnColor};
  width: 28px;
  height: 28px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.3s;
  cursor: pointer;
  &.left { 
    right: 50px;
  }
  &.right {
    right: 15px;
  }
  &.disabled {
    background-color: ${props => props.theme.btnDisabled};
    cursor: default;
  }
`

export const Keyword = styled.div<KeywordProps>`
  height: 100%;
  background-color: ${(props: any) => !props.isSelected ? props.theme.btnColor : '#FFFFFF'};
  border-radius: 12px 12px 0 0;
  border: none;
  box-shadow: 0px 2px 2px 0.5px rgba(0, 0, 0, 0.4); 
  cursor: pointer;
  > p {
    height: 100%;
    font-size: 20px;
    font-family: 'Poor Story';
    -webkit-text-stroke: 0.2px ${(props: any) => !props.isSelected ? '#FFFFFF' : props.theme.btnColor};;
    color: ${(props: any) => !props.isSelected ? '#FFFFFF' : props.theme.btnColor};
    display: flex;
    justify-content: center;
    align-items: center;
  }
`

export const Choice = styled.div<ChoiceProps>`
  width: 100%;   
  height: 92%;
  background-color: #FFFFFF;
  display:flex;
  flex-wrap: wrap;
  margin-top: ${props => props.isKeywordList ? '0px' : '10px'};
  border-radius: ${props => props.isKeywordList ? '0 0 12px 12px' : '12px'};
  box-shadow: 0px 2px 2px 0.5px rgba(0, 0, 0, 0.4);
  border: none;
  overflow: auto;
`

export const ChoiceGrim = styled.img`
  width: 95px;
  height: 95px;
  object-fit:cover;
  margin: 2rem;
  cursor: pointer;
`

export const Choicebutton = styled.button`
  width: 90px;
  height: 35px;
  background-color: transparent;
  color: black;
  border: 2px solid black;
  border-radius: 20px;
  text-align: center;
  font-size: 17px;
  margin-left: 1.5%;
  transition: box-shadow 250ms ease-in-out, color 200ms ease-in-out;
  font-family:KyoboHand;
  font-weight: bolder;
  &:hover{
      box-shadow: 0 0 40px 40px #404040 inset;
      color: white;
      border:none;
  }
`

export const DalleTitle =styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  line-height: 1.5;
  width: 100%;
  font-size: 32px;
  font-family: 'Poor Story';
  -webkit-text-stroke: 0.4px #373737;
  color: #373737;
  margin-bottom: 25px;
`

export const DalleWrap = styled.div`
  width: 85%;
  height: 65%;
  display: flex;
  jusitfy-content: space-between;
  flex-wrap: wrap;
  align-items: flex-start;
`

export const DalleGrim = styled.img`
  width: 45%;
  height: 175px;
  object-fit: cover;
  cursor: pointer;
  border-radius: 8px;
  &:first-child{
    margin-right: 53px;
  }
  &:last-child{
    margin-left: 53px;
  }
`

export const ShowManuScriptWrap = styled.div`
  display: grid; 
  grid-template-columns: repeat(10, 1fr);
  grid-template-rows: repeat(5, 1fr);
  height: 100%;
  font-size: 24px;
`

export const EachWordWrap = styled.div`
  border: 1px solid #434343;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const CursorWrap = styled.div`
  display: flex;
`

const blinkCursor = keyframes`
  50% {
    opacity: 0;
  }
`

const CommonCursorProps = styled.div<CursorProps>`
  border: 0px solid black;
  animation: ${blinkCursor} 1s infinite;
`

export const LeftCursor = styled(CommonCursorProps)`
  border-right-width: ${props => props.cursor === 0 && props.idx === 0 ? '3px' : '0px'};
  margin-right: 3px;
`

export const RightCursor = styled(CommonCursorProps)`
  border-right-width: ${props => props.cursor - 1 === props.idx && props.cursor > 0 ? '3px' : '0px'};
  margin-left: 3px;
`