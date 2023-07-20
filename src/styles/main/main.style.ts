import styled from "styled-components";

export const Content = styled.div`
  margin-top : 80px;
  font-size : 32px;
`

export const Aiary = styled.img`
  width : 340px;
  height : 150px;
`

export const Logo = styled.img`
  width : 440px;
  height : 380px;
`

export const ButtonWrap = styled.div`
  margin-bottom : 80px;
`

export const SignInButton = styled.button`
  background-color : #EB8888;
  color : #FFFFFF;
  font-size : 32px;
  padding : 12px 36px;
  border-radius : 36px;
  margin-right : 50px;
  // transition: background-color 1s; // 서서히 바뀌는 효과인데 필요하면 추가
  &:hover {
    background-color : #FDAEBE;
  }
`

export const SignUpButton = styled.button`
  background-color : rgba(1, 1, 1, 0);
  color : #EB8888;
  font-size : 32px;
  padding : 12px 36px;
  border-radius : 36px;
  border : 2px solid #EB8888;

`