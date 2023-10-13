import styled from "styled-components";
import { ReactComponent as Sunny } from '../../../public/images/sunny.svg';
import { ReactComponent as Cloud } from '../../../public/images/cloud.svg';
import { ReactComponent as Rainy } from '../../../public/images/rainy.svg';
import { ReactComponent as Snow } from '../../../public/images/snow.svg';
import { ReactComponent as Share } from '../../../public/images/share.svg';
import { ReactComponent as Delete } from '../../../public/images/delete.svg';


export const DiviContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const DiaryContainer = styled.div`
  width: 85%;
  height: 90%;
  border-radius: 4px;
  border: 1.6px solid #434343;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`

export const DateContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 7px 12px;
  box-sizing: border-box;
  border-bottom: 1.6px solid #434343;
`;

export const DateContent = styled.div`
  font-family: 'Poor Story';
  font-size: 24px;
  color: #373737;
  text-align: center;
  -webkit-text-stroke: 0.4px #373737;
`;

export const WeatherWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  .weather{
    margin-right: 13px;
  }
`;

export const StyledSunny = styled(Sunny)`
  fill: ${props => props.fill};
  width: 32px;
  height: 32px;
`

export const StyledCloudy = styled(Cloud)`
  fill: ${props => props.fill};
  width: 32px;
  height: 32px;
`

export const StyledRainy = styled(Rainy)`
  fill: ${props => props.fill};
  width: 32px;
  height: 32px;
`

export const StyledSnow = styled(Snow)`
  fill: ${props => props.fill};
  width: 32px;
  height: 32px;
`

export const WeatherRadioBtn = styled.input`
  display: none;
`;

/*제목 container*/
export const TitleContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;;
  align-items: center;
  padding: 8px 12px;
  box-sizing: border-box;
  border-bottom: 1.6px solid #434343;
`;

export const Title = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 120;
  font-family: 'Poor Story';
  font-size: 24px;
  color: #373737;
  -webkit-text-stroke: 0.4px #373737;
`;

export const Titlecontent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 10px;
  z-index: 120;
  > input {
    width: 400px;
    font-size: 24px;
    outline: none;
    background: transparent;
    font-family: 'Poor Story';
    color: #373737;
    caret-color: transparent;
  }
`;

export const Emoji = styled.div`
  font-size: 28px;
  margin-top: 3px;
`

/*그림판 container*/
export const Canvas = styled.div`
  width: 100%;
  height: 290px;
  position: relative;
  background-color: #ffffff;
  border-bottom: 1.6px solid #434343;
  > img {
    width: 100%;
    height: 100%;
    object-fit: fill;
  }
`;

/*내용 container*/
export const Content = styled.div`
  width: 100%;
  flex: 1;
`;

export const PaperContainer = styled.div`
  box-sizing: content-box;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
  height: 100%;
  > label {
    width: 100%;
    height: 100%;
  }
`
export const TableTr = styled.div`
  --line-length: 20;
  width: 100%;
  height: calc(100% / 5);
  display: flex;
  &:last-child {
    border-bottom: none;
  }
`

export const TableTd =styled.div`
  --line-length: 10;
  border-bottom: 1.6px solid #434343;
  border-right: 1.6px solid #434343;
  height: 100%;
  width: calc(100% / var(--line-length)); 
  font-family: 'Poor Story';
  color: #373737;
  font-size: 24px;
  -webkit-text-stroke: 0.4px #373737;
  display: flex;
  justify-content: center;
  align-items: center;
  &:nth-child(10) {
    border-right: none;
  }
  &.no-border-bottom {
    border-bottom: none;
  }
`

export const ChoiceButtonContainer = styled.div`
  width: 100%;
  position: absolute;
  bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`

export const ButtonItem = styled.button`
  margin-right: 13px;
  &:hover circle{
    fill: #434343;
  }
  &:hover path {
    fill: white;
  }
`

export const StyledShare = styled(Share)`
  width: 41px;
  height: 41px;
`

export const StyledDelete = styled(Delete)`
  width: 42px;
  height: 41px;
`