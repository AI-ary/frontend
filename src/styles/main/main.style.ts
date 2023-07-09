import styled from "styled-components"

// MemberMain
export const Wrap = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  bottom: 20px;`

export const Nickname = styled.h1`
  display: flex;
  justify-content: center;
  text-align: center;
  position: relative;
  margin: 10px;
  bottom: 22px;
  font-size: 45px;`

export const SelectBtn = styled.div`
  background-color: rgb(0, 0, 0, 0);
  border-radius: 25px;
  position: relative;
  left: 155px;
  bottom: 45px;
  `

export const StartBtn = styled.div`
  background-color: rgb(240, 219, 109);
  border-radius: 25px;`


// NonMemberMain
export const LinkBox = styled.div`
  width: 110%;
  margin: auto;
  padding-bottom : 10px;
  display: flex;
  text-align: center;
  position: relative;
  left: 2.5px;
  `

export const ShowImage = styled.img`
  display: flex;
  justify-contents : center;
  align-items : center;
  width: 420px;
  heigth: 450px;
`

// OpenModal
export const ChoseBtn = styled.div`
  background-color: rgb(240, 219, 109);
  border-radius: 25px;`

export const InsideModal = styled.div`
  margin-top: 0;
  width: 550px;
  height: 420px;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-evenly;
  align-items: center;
  align-content: flex-start;`

export const ItemBox = styled.div`
  padding: 0px;
  margin-top: 0;
  width: 550px;
  height: 400px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;`
