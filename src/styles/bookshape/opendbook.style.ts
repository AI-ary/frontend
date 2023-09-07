import styled from 'styled-components';

export const BookContainer = styled.div`
  height: 780px;
  display: flex;
  justify-content: center;
  align-items: center;
`
export const OpenBookLeft = styled.div`
  position: relative;
  width: 650px;
  height: 100%; 
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px 0 0 8px;
  border-width: 0  0 10px 10px;
  border-style: solid;
  border-color: #FFD2DC;
  background-color: #FDF9FB;
  margin-left: 70px;
`
export const OpenBookRight = styled.div`
  position: relative;
  width: 695px;
  height: 100%; 
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 0 8px 8px 0;
  border-width: 0 10px 10px 0 ;
  border-style: solid;
  border-color: #FFD2DC;
  background-color: #FDF9FB;
`

export const Line = styled.div<{ position: string, deg:string }>`
  position: absolute;
  height: 100%; 
  width: 10px;
  ${props => props.position}: 0; 
  border-width: ${props => props.position === 'right'? '0 2px 0 0':'0 0 0 2px'};
  border-style: solid;
  border-color: rgba(0, 0, 0, 0.2);
  box-sizing: border-box;
  background: linear-gradient(${props=>props.deg}, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.04), rgba(0, 0, 0, 0.164), rgba(0, 0, 0, 0.2));
  backdrop-filter: blur(5px);
`

export const CoverYear = styled.div`
  font-size: 24px;
  font-family:'Itim';
  margin-bottom: 10px;
`

export const Nickname = styled.h1`
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  position: relative;
  bottom: 22px;
  font-size: 45px;
  font-family:'Itim';
  > p > span {
    font-family:'Poor Story';
  }
`
export const Profile = styled.div`
  width: 260px;
  height: 260px;
  border-radius: 50%;
  background-color: white;
  border: 8px solid ${props => props.theme.lineColor};
  overflow: hidden;
  background-image: url('/images/profileBg.svg');
  > img {
    width: 100%;
    height: 100%; 
    object-fit: cover;
  }
`
export const SelectBtn = styled.label`
  background-color: ${props => props.theme.lineColor};
  position: relative;
  top: -80px;
  left: 90px;
  border-radius: 50%;
  padding: 18px;
  cursor: pointer;
  box-sizing: border-box;
  .profile {
    color: ${props => props.theme.profileColor};
  }
  `
