import styled, { css } from 'styled-components';
import { ReactComponent as HiddenPalette } from '../../../public/images/palette.svg';
import { ReactComponent as ShowPalette } from '../../../public/images/palette2.svg';
import { ReactComponent as CheckIcon } from '../../../public/images/check.svg';

export const Container = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  align-items: center;
  justify-content: center;
`;

export const Left = styled.div`
  width: 55px;
  height: 780px;
  background: ${(props) => props.theme.bgSideColor};
  border-radius: 8px 0px 0px 8px;
`;

export const Flip = styled.div`
  display: flex;
  height: 780px;
`;

export const BackBtn = styled.button<{ path: string }>`
  position: absolute;
  width: 55px;
  height: 55px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 100%;
  background-color: ${(props) => props.theme.btnColor};
  padding-right: 5px;
  margin: 35px 0px 0px 35px;
  color: #ffffff;
  ${(props) => css`
    display: ${props.path === '/signup' ? '' : 'none'};
  `}
`;

export const Mid = styled.div`
  width: 695px;
  height: 780px;
  background-color: ${(props) => props.theme.bgColor};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 64px 0px;
`;

export const Right = styled.div`
  width: 10px;
  height: 780px;
  background: ${(props) => props.theme.bgSideColor};
  border-radius: 0px 8px 8px 0px;
`;

export const BehindWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  z-index: -1;
  height: 780px;
  margin-left: 134px;
`;

export const FrontWrap = styled.div`
  position: absolute;
  display: flex;
`;

export const ThemeContainer = styled.div`
  position: absolute;
  top: 0;
  left: 40px;
  width: 270px;
  height: 100%;
  display: flex;
  padding: 0 10px;
  box-sizing: border-box;
  justify-content: flex-start;
  align-items: center;
`;

export const StyledHiddenPalette = styled(HiddenPalette)`
  cursor: pointer;
  z-index: 99;
`;
export const StyledShowPalette = styled(ShowPalette)`
  cursor: pointer;
  z-index: 99;
`;

export const StyledCheckIcon = styled(CheckIcon)`
  cursor: pointer;
  z-index: 99;
`;

export const ToggleTheme = styled.ul`
  height: 280px;
  position: absolute;
  left: 80px;
  transition: all 0.3s;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
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
    width: 108px;
    height: 108px;
    overflow: hidden;
    > img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  > li:nth-child(2) {
    margin-left: 50px;
  }
`;
