import styled, { css } from 'styled-components';

export const TitleWrap = styled.div`
  display : flex;
  flex-direction : column;
  align-items : center;
`

export const Title = styled.div`
  font-size : 80px;
`

export const IconWrap = styled.div`
  background-color : ${props => props.theme.bgIcon};
  border-radius : 100%;
`

export const Container = styled.div`
  display : flex;
  flex-direction : column;
  align-items : center;
  height : 100%;
  justify-content : space-between;
`

export const Input = styled.input<{isValid : boolean}>`
  width : 575px;
  border-radius : 12px;
  margin-bottom : 15px;
  padding : 18px 20px;
  font-size : 20px;
  outline: none;
  color : #000000;
  ${(props) => css`
    border : 3px solid ${props.isValid ? 'red' : 'none'};
  `}
`

export const InputWrap = styled.div`
  display : flex;
  flex-direction : column;
  height : 100%;
  justify-content : center;
`

export const BtnWrap = styled.div`
  display : flex;
  flex-direction : column;
`