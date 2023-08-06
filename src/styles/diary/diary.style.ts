import styled from "styled-components";

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
  margin-left: 10px;
  z-index: 120;
  > input {
    margin-bottom: 0.5%;
    font-size: 24px;
    border: 0;
    outline: none;
    background: transparent;
    padding-top: 4px;
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
  position: relative;
  background-color: #ffffff;
  border-bottom: 1.6px solid #434343;
`;

/*내용 container*/
export const Content = styled.div`
  width: 100%;
  flex: 1;
`;

export const PaperContainer = styled.div`
  --line-length: 10;
  box-sizing: content-box;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: calc(var(--line-length));
`
export const TableTr = styled.div`
  display: flex;
  &:last-child {
    border-bottom: none;
  }
`

export const TableTd =styled.div`
  border-bottom: 1.6px solid #434343;
  border-right: 1.6px solid #434343;
  width: 54.2px;
  height: 52px;
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
  margin-right: 10px;
`