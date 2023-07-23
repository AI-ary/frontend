import styled, { css } from "styled-components";

export const CommonFilledBtn = styled.button<{ isValid: boolean }>`
  padding : 12px 36px;
  font-size : 32px;
  border-radius : 36px;
  color : #FFFFFF;
//   transition : background-color 1s;  // hover on&off 시 색상 천천히 변하는 효과, 넣을지 말지 얘기해보기
  ${(props) => css`
    background-color : ${props.isValid ? 'rgba(235, 136, 136, 0.3)' : '#EB8888'};
    &:hover {
      background-color : ${props.isValid ? '' : '#FDAEBE'};
    } 
  `
  }
`

export const CommonEmptyBtn = styled.button<{ isValid: boolean }>`
  padding : 12px 36px;
  font-size : 32px;
  border-radius : 36px;
  color : #EB8888;
  border : 2px solid #EB8888;
  ${(props) => css`
    
  `
  }
`

export const CommonOutlinedBtn = styled.button`
  padding : 12px 36px;
  font-size : 20px;
  border-radius : 36px;
  color : #EB8888;
  margin-top : 16px;
`