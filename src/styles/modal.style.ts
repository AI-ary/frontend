import styled from "styled-components";

export const Background = styled.div`
  background-color: rgba(0,0,0,0.5);
  position: fixed;
  left: 0;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  z-index : 99;
`

export const Container = styled.div`
  background-color: white;
  width: 620px;
  height: 300px;
  border-radius: 16px;
  flex-direction: column;
  align-items: center;
  padding: 45px 100px;
  text-align: center;
  font-size: 36px;
`

export const ContentWrap = styled.div`
  height:100%;
  display : flex;
  flex-direction : column;
  justify-content : space-between;
`

export const IconWrap = styled.div<{icon : string}>`
  align-self : center;
  color:${props => props.icon === 'warning' ? 'red' : 'green'};
`

export const Title = styled.div`
  color : rgb(0, 0, 0);
`

export const Content = styled.div`
  color : rgb(0, 0, 0);
`

export const TwoButtonWrap = styled.div`
  display : flex;
  justify-content : space-between;
  width: 70%;
`

export const ButtonWrap = styled.div`
  display:flex;
  justify-content : center;
`