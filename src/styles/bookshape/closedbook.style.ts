import styled from "styled-components"

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
  background : linear-gradient( to right, #FEE6EB, #FDBDCA);
  border-radius : 8px 0px 0px 8px;
`

export const Flip = styled.div`
  display : flex;
`

export const Mid = styled.div`
  width : 695px;
  height : 780px;
  background-color : #FEE6EB;
  display : flex;
  flex-direction : column;
  align-items : center;
  justify-content : space-between;
`

export const Right = styled.div`
  width : 10px;
  height : 780px;
  background : linear-gradient( to right, #FEE6EB, #FDBDCA);
  border-radius : 0px 8px 8px 0px;
`
