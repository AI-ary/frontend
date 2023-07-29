import styled, { css } from 'styled-components';

export const CommonFilledBtn = styled.button<{ isValid: boolean }>`
  padding : 12px 36px;
  font-size : 32px;
  border-radius : 36px;
  color : ${props=>props.theme.btnFontColor};
//   transition : background-color 1s;  // hover on&off 시 색상 천천히 변하는 효과, 넣을지 말지 얘기해보기
  ${(props) => css`
    background-color : ${props.isValid ? props.theme.btnDisabled : props.theme.btnColor};
    &:hover {
      background-color : ${props.isValid ? '' : props.theme.btnHover};
    } 
  `
}
`

export const CommonEmptyBtn = styled.button<{ isValid: boolean }>`
  padding : 12px 36px;
  font-size : 32px;
  border-radius : 36px;
  color : ${props=>props.theme.btnColor};
  margin-top : 16px;
  ${(props) => css`
    
  `
}
`

export const CommonOutlinedBtn = styled.button`
  padding : 12px 36px;
  font-size : 32px;
  border-radius : 36px;
  color : ${props=>props.theme.btnColor};
  border : 2px solid ${props=>props.theme.btnColor};
`