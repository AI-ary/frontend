import styled, { css } from "styled-components"

export const Container = styled.div`
  display : flex;
  width : 100vw;
  height : 100vh;
  align-items : center;
  justify-content : center;
`

export const Left = styled.div`
  width : 55px;
  height : 780px;
  background : ${props => props.theme.bgSideColor};
  border-radius : 8px 0px 0px 8px;
`

export const Flip = styled.div`
  display : flex;
  height : 780px;
`

export const BackBtn = styled.button<{path : string}>`
  position : absolute;
  width : 55px;
  height : 55px;
  display : flex;
  align-items : center;
  justify-content : center;
  border-radius : 100%;
  background-color : ${props=>props.theme.btnColor};
  padding-right : 5px;
  margin : 35px 0px 0px 35px;
  color : #FFFFFF;
  ${(props) => css`
    display : ${props.path === '/signup' ? '' : 'none'};
  `}
`

export const Mid = styled.div`
  width : 695px;
  height : 780px;
  background-color : ${props => props.theme.bgColor};
  display : flex;
  flex-direction : column;
  align-items : center;
  justify-content : space-between;
  padding : 64px 0px;
`

export const Right = styled.div`
  width : 10px;
  height : 780px;
  background : ${props => props.theme.bgSideColor};
  border-radius : 0px 8px 8px 0px;
`

export const BehindWrap = styled.div`
  display : flex;
  position : absolute;
  height : 780px;
  margin-left : 134px;
`

export const FrontWrap = styled.div`
  position : absolute;
  display : flex;
`