import styled from 'styled-components';

/* 펼친 책 모양 스타일 */
export const BookShape2Left = styled.div`
    display: flex;
    align-items: center;
    width: 600px;
    height: 750px; 
    justify-content: center;
    border-top-left-radius: 30px;
    border-bottom-left-radius: 30px;
    border: 5px solid #F0DB6D;
    border-right : rgba(245, 245, 245, 1);
    background-color: white;
    background-size:cover;
    background-image: url("/images/paper.jpeg");
    box-shadow:12px 9px 10px 0 #676262;
`
export const Line = styled.div`
  width: 8px;
  border-top : 5px solid #F0DB6D;
  border-bottom : 5px solid #F0DB6D;
  background: linear-gradient(-90deg, rgba(129, 121, 121, 1), rgba(244, 244, 244, 1));
  height : 750px;
  box-shadow:12px 9px 10px 0 #676262;
  `
export const BookShape2Right = styled.div`
  display: flex;
  width: 600px;
  height: 750px; 
  justify-content: center;
  border-top-right-radius: 30px;
  border-bottom-right-radius: 30px;
  border: 5px solid #F0DB6D;
  border-left: rgba(245, 245, 245, 1);
  background-color: white;
  background-size:cover;
  /*css파일에서 image불러올 때 public폴더에 있는 이미지는 못 불러옴(정확한 경로 작성해야함)*/
  background-image: url("/images/paper.jpeg");
  box-shadow: 7px 9px 10px 0px #676262;
`

export const WriteContainer = styled.div`
  position: relative;
`
export const Book2Container = styled.div`
  height: 100vh;
  display: flex;
  position: absolute;
  top: 0;
  right: -200%;
  bottom: 0;
  left: -200%; 
  justify-content: center;
  align-items: center;
  margin-left: 70px;
  margin-top: 40px;
`

/*두쪽 페이지 틀에서 한쪽 영역 컨테이너*/
export const DiviContainer = styled.div`
  position: absolute;
  width: 600px;
  height: 750px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 90;
`;
/*날짜&날씨 container*/
export const DateContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 500px;
  height: 60px;
`;

export const Dateline = styled.div`
  width: 500px;
  height: 40px;
  background-color: #bcbcbc;
  display: flex;
  align-items: center;
  border-radius: 3px;
`;

export const Datetitle = styled.div`
  margin-left: 5%;
  width: 10%;
  font-size: 25px;
  text-align: center;
  font-family: KyoboHand;
`;

export const DateContent = styled.div`
  width: 25%;
  font-size: 24px;
  border: 2px solid transparent;
  border-radius: 30px;
  background: #d9d9d9;
  margin-left: 2%;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 100%;
  color: #4b4b4b;
  font-family: KyoboHand;
  padding-top: 3px;
`;

export const Weathercontainer = styled.div`
  width: 32%;
  text-align: right;
  margin-left: auto;
  padding-right: 8px;
  display: flex;
  justify-content: space-around;
  align-items: flex-start;
`;

export const WeatherRadioBtn = styled.input`
  display: none;
`;

/*제목 container*/
export const TitleContainer = styled.div`
  width: 500px;
  height: 40px;
  background: #c7c7c7;
  display: flex;
  align-items: center;
  border-top-left-radius: 3px;
  border-top=right-radius: 3px;
  font-family: KyoboHand;
`;

export const Title = styled.div`
  margin-left: 5%;
  width: 10%;
  text-align: left;
  font-size: 25px;
  font-family: KyoboHand;
  z-index: 120;
  position: absolute;
`;

export const Titlecontent = styled.div`
  width: 60%;
  margin-left: 13%;
  z-index: 120;
  position: absolute;
  > input {
    width: 90%;
    margin-bottom: 0.5%;
    font-size: 26px;
    border: 0;
    outline: none;
    background: transparent;
    padding-top: 4px;
    font-family: KyoboHand;
    color: #4b4b4b;
    caret-color: transparent;
  }
`;

/*그림판 container*/
export const Canvas = styled.div`
  width: 500px;
  height: 290px;
  background: white;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
`;

/*버튼 컨테이너(그림 편집)*/
export const ButtonContainer = styled.div`
  width: 500px;
  height: 25px;
  display: flex;
  align-items: center;
  margin-top: 2%;
`;
export const Modebutton = styled.button`
  width: 75px;
  height: 30px;
  border-radius: 20px;
  font-size: 15px;
  text-align: center;
  background-color: transparent;
  margin-right: 1.5%;
  border: 2px solid black;
  transition: box-shadow 250ms ease-in-out, color 200ms ease-in-out;
  font-family: KyoboHand;
  padding-bottom: 0.5%;
  padding-top: 3px;
  &:hover {
    box-shadow: 0 0 40px 40px #404040 inset;
    color: white;
    border: none;
  }
`;

export const Savebutton = styled.button`
  width: 110px;
  height: 30px;
  background-color: black;
  color: white;
  border-radius: 15px;
  text-align: center;
  border: none;
  margin-left: auto;
  font-size: 15px;
  padding-bottom: 0.5%;
  overflow: hidden;
  transition: box-shadow, color 300ms ease-in-out;
  font-family: KyoboHand;
  padding-top: 3px;
  &:hover {
    color: rgb(54, 54, 54);
    background-color: transparent;
    border: 3px solid rgb(54, 54, 54);
  }
`;
/*내용 container*/
export const Content = styled.div`
  width: 520px;
  height: 280px;
`;


/* 원고지 스타일 */
export const PaperContainer = styled.div`
  --line-length: 10;
  box-sizing: content-box;
  border: 2px groove transparent;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: calc(var(--line-length));
  font-size: calc(450px / var(--line-length) / 1.5);
`
export const PaperSpan = styled.div`
  box-sizing: border-box;
  flex: 1 0 auto;
  vertical-align: middle;
  display: inline-flex;
  flex-wrap: nowrap;
  align-content: center;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width:1.5em;
  height:1.5em;
  border:1px solid red;
  border-left-width: 0px;
  margin-top: 20px;
  margin-left: 9px;
`

export const GridContent =styled.textarea`
  position: absolute;
  width: 520px;
  height: 280px;
  background-color: rgba(0, 0, 0, 0);
  letter-spacing:33px;
  padding-left: 25px;
  line-height: 60px;
  z-index: 20;
  font-size: 1.8rem;
  word-break: break-all;
  resize: none;
  border: none;
  outline: none;
  caret-color: transparent;
  color: rgba(0, 0, 0, 0);
  text-decoration-line: none;
  z-index: -1;
  top: -800px;
`

export const TableTd =styled.div`
  border: 1px solid black;
  width: 47.3px;
  height: 47.3px;
  font-size: 30px;
  text-align: center;
  z-index: 1;
  margin-bottom: 5px;
  margin:1px;
`

/* 버튼 스타일 */
export const ChoiceButtonContainer = styled.div`
    width: 500px;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: end;
`
