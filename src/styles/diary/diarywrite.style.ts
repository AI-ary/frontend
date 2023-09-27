import styled from 'styled-components';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

interface BtnProps {
  isDisabled:boolean
}
interface KeywordProps {
  isSelected: boolean;
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

export const Modebutton = styled.button<BtnProps>`
  width: 100px;
  border-radius: 20px;
  font-size: 15px;
  font-family: 'Poor Story';
  -webkit-text-stroke: 0.4px #373737;
  text-align: center;
  color: ${props => !props.isDisabled ? '#373737' : 'rgba(1,1,1,0.5)'};
  background-color: transparent;
  margin-right: 5px;
  border: 2px solid #373737;
  transition: box-shadow 250ms ease-in-out, color 200ms ease-in-out;
  padding: 7px 5px;
  box-sizing: border-box;
  &:hover {
    box-shadow: 0 0 30px 30px #404040 inset;
    color: white;
    border: none;
  }
`;

export const Savebutton = styled.button`
  width: 110px;
  background-color: #373737;
  color: white;
  border-radius: 15px;
  text-align: center;
  border: none;
  margin-left: auto;
  font-size: 15px;
  font-family: 'Poor Story';
  -webkit-text-stroke: 0.4px #373737;
  transition: box-shadow, color 300ms ease-in-out;
  padding: 7px 5px;
  box-sizing: border-box;
  &:hover {
    color: rgb(54, 54, 54);
    background-color: transparent;
    border: 2px solid #373737;
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
  bottom: 50px;
  left: 20px;
  display: flex;
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
  background-color: #EB8888;
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
    background-color: #FFD2DC;
    cursor: default;
  }
`

export const Keyword = styled.div<KeywordProps>`
  height: 100%;
  background-color: #EB8888;
  border-radius: 12px 12px 0 0;
  border: none;
  box-shadow: 0px 2px 2px 0.5px rgba(0, 0, 0, 0.4); 
  cursor: pointer;
  font-size: 20px;
  font-family: 'Poor Story';
  -webkit-text-stroke: 0.2px #FFFFFF;
  color: #FFFFFF;
  text-align: center;
  ${({ isSelected }) =>
  isSelected &&`
  background-color: #FFFFFF;
  -webkit-text-stroke: 0.2px #EB8888;
  color: #EB8888; 
  `}
`

export const Choice = styled.div`
  width: 100%;   
  height: 92%;
  background-color: #FFFFFF;
  display:flex;
  flex-wrap: wrap;
  border-radius: 0 0 12px 12px;
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