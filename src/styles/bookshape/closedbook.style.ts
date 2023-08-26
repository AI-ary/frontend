import styled, { css } from "styled-components"
import { ReactComponent as HiddenPalette } from '../../../public/images/palette.svg';
import { ReactComponent as ShowPalette } from '../../../public/images/palette2.svg';

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

export const StyledHiddenPalette = styled(HiddenPalette)`
  position: absolute;
  left: 40px;
  top: 40%;
  width: 100px;
  height: 100px;
  cursor: pointer;
  z-index: 99;
`
export const StyledShowPalette = styled(ShowPalette)`
  position: absolute;
  left: 40px;
  top: 40%;
  width: 100px;
  height: 100px;
  cursor: pointer;
  z-index: 99;
`

export const ToggleTheme = styled.ul`
  width: 200px;
  height: 300px;
  position: absolute;
  top: 28%;
  left: 60px;
  transition: all 0.3s;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  cursor: pointer;
  &.show-menu {
    visibility: visible;
    opacity: 1;
    
  }
  &.hide-menu {
    visibility: hidden;
    opacity: 0;
  }

  > li {
    width: 65px;
    height: 65px;
    overflow: hidden;
    > img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  > li:last-child{
    position: absolute;
    left: 100px;
  }
`