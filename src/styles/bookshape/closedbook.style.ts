import styled, { css } from "styled-components"

interface LabelProps {
  name: string;
  path: string;
}

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

export const LabelWrap = styled.div`
  display : flex;
  flex-direction : column;
`

export const Label = styled.button<LabelProps>`
  background-color : #FFD2DC;
  width : 90px;
  height : 60px;
  border-radius : 0px 8px 8px 0px;
  font-size : 18px;
  ${(props) => css`
    margin-top : ${props.name === '홈' ? '55px' : '20px'};
    // 현재 위치가 어디냐에 따라 책갈피 색상 바뀌게 설정
    background-color : ${(props.path === '/' || props.path === '/signin' || props.path === '/signup' || props.path === '/main') && props.name === '홈' || (props.path === '/write' || props.path === '/list') && props.name === '일기 쓰기'? props.theme.bookMarkActiveBg : props.theme.bookMarkBg };
  `}
`