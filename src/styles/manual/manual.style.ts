import styled from 'styled-components';

export const IntroduceContainer = styled.div`
    position: absolute;  
    width: 600px;
    height: 750px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    z-index: 90;
`

export const Introducetitle =styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 500px;
    height: 70px;
    font-size: 35px;
    font-family:KyoboHand;
    font-weight: bolder;
    font-style: italic;
`

export const LogoImg = styled.img`
    width: 25%;
    border:none;
`

export const IntroduceTeam = styled.div`
    width: 100%;
    height: 60%;
    // border: 3px solid black;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    margin-left: 60px;
`

export const Team = styled.div`
    width: 45%;
    display: flex;
    // justify-content: center;
    align-items:center;
    flex-direction: row;
    margin-top: 10px;
    margin-right: 8px;
    &>p{
        font-size: 1.2em;
        margin-left: 10px;
        font-family:KyoboHand;
        font-weight: bolder;
    }
`

export const TeamImg = styled.img`
    width: 130px;
    height: 130px;
    border: 2px dashed gray;
    border-radius: 10%;
    object-fit: cover;
`

export const TeamGit = styled.a`
    text-decoration:none;
    cursor: pointer;
    color: black;
    font-family:KyoboHand;
    font-weight: bolder;
    font-size: 20px;
    &:visited{
        text-decoration:none;
        color:black;
    }
    &:hover{
        color: orange;
    }
    margin-left: 10px;
`

export const ServiceImg = styled.img`
  margin-top:10%;
  width: 90%;
  height: 45%;
  border: 3px dashed black;
  border-radius: 8px;
`

export const ServiceInfo=styled.div`
  padding-top: 20px;
  text-align: start;
  line-height: 50px;
  width: 90%;
  height: 40%;
  font-size: 30px;
  font-family:KyoboHand;
  font-weight: bolder;
`