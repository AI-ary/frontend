import styled, { css, keyframes } from "styled-components";

interface ValidProps {
  nValid: boolean;
  eValid: boolean;
  pValid: boolean;
  sValid: boolean
}

export const TitleWrap = styled.div`
  display : flex;
  flex-direction : column;
  align-items : center;
  margin-top : 60px;
`

export const Title = styled.div`
  font-size : 80px;
`

export const Container = styled.div`
  display : flex;
  flex-direction : column;
  align-items : center;
`

export const Input = styled.input<{isValid : boolean}>`
  width : 575px;
  border-radius : 12px;
  margin-bottom : 15px;
  padding : 18px 20px;
  font-size : 20px;
  outline: none;
  ${(props) => css`
    border : 3px solid ${props.isValid ? '#EB8888' : 'none'};
  `}
`

export const CreateBtn = styled.button<{isValid : boolean}>`
  padding : 12px 36px;
  font-size : 32px;
  border-radius : 36px;
  margin : 36px 0px 64px 0px;
  color : #FFFFFF;
  ${(props) => css`
    background-color : ${props.isValid ? 'rgba(235, 136, 136, 0.3)' : '#EB8888'};
    &:hover {
      background-color : ${props.isValid ? '' : '#FDAEBE'};
    } 
  `
  }
`