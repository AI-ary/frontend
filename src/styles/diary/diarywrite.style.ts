import styled from 'styled-components';

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
  width: 100px;
  border-radius: 20px;
  font-size: 15px;
  font-family: 'Poor Story';
  -webkit-text-stroke: 0.4px #373737;
  text-align: center;
  color: #373737;
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