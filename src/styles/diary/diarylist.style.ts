import { Link } from "react-router-dom";
import styled from "styled-components";

/* 일기 목록(작성한 일기가 없는 경우) */
export const NonDiaryContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  > img {
    margin-bottom: 40px;
  }
  > div {
    font-size: 48px;
    font-family: 'Poor Story';
    color: #373737;
    text-align: center;
    line-height: 1.3;
    margin-bottom: 40px;
    > span{
      color: #EB8888;
    }
  }
`
export const GotoDiaryWrite = styled(Link)`
  background-color: #EB8888;
  border-radius: 36px;
  padding: 15px 30px;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 32px;
  color: #FFFFFF;
  font-family: 'Poor Story';
  &:hover{
    background-color: #FF839C;
  }
`

/* 달력 */
export const CalenderContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content:flex-start;
  align-items:center;
  padding: 20px 0 30px 0; 
  box-sizing: border-box;
`

export const HeaderContainer = styled.div`
  width: 100%;
  height: 15%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 15px 15px;
  margin-bottom: 5px;
  box-sizing: border-box;
`

export const HeaderYear = styled.div`
  display: flex;
  justify-content: center;
  align-items:center;
  font-family: 'Poor Story';
  color: #373737;
  font-size: 20px;
  margin-bottom: 10px;
`

export const HeaderDate = styled.div`
  width: 95%;
  display: flex;
  justify-content: space-between;
  align-items:center;
  > p {
    font-family: 'Poor Story';
    color: #373737;
    font-size: 48px;
  }
  .icons{
    cursor: pointer;
  }
  .icons:hover{
    cursor: pointer;
    transition: 0.2s ease-in-out;
    transform: scale(1.15);
  }
`

export const WeekWrap = styled.div`
  width: 90%;
  height: 5%;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  > p {
    margin-top: 5px;
    font-family: 'Poor Story';
    color: #373737;
    font-size: 24px;
    width: 100%;
    text-align: center;
  }
`

export const DaysWrap = styled.div`
  width: 90%; 
  height: 80%;
  z-index: 40;
  margin-top: 10px;
  box-sizing: border-box;
`

export const DaysRow = styled.div`
  width: 100%;
  height: 17%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid #C9C9C9;
  border-top: none;
  border-bottom: none;
  &:first-child {
    border-top: 1px solid #C9C9C9;
    border-radius: 4px 4px 0 0;
  }
  &:last-child{
    border-bottom: 1px solid #C9C9C9;
    border-radius: 0 0 4px 4px;
  }
`

export const DaysCol =styled.div`
  width: 15%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  font-family: 'Poor Story';
  font-size: 20px;
  color: #373737;
  border: 1px solid #C9C9C9;
  border-bottom: none;
  padding: 10px 0;
  box-sizing: border-box;
  &.not-valid{
    color: #B4B4B4; 
  }
  &.today{
    cursor: pointer;
    color:#373737; 
    border: 2px solid #FDAEBE;
    box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
  }
  &.cell.valid:hover{
    cursor: pointer;
    transition: 0.2s ease-in-out;
    box-shadow: 1.5px 1.5px 0px 0px #c4c4c4;
    transform: scale(1.01);
    border: none;
    background: #c4c4c4;
  }
  &.cell.selected{
    cursor: pointer;
    box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);   
    transform: scale(1.01);
    border: none;
    background-color: #FFD2DC;
    color: #e55218;
  }
`

export const IconWrap = styled.div`
  margin-top: 6px;
  position: relative;
  .hover-close{
    cursor: pointer;
    transition: 0.2;
    z-index: 100;
  }
  .hide {
    display: none;
  }
`

export const ListEmoji = styled.div`
  margin-top: 6px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 33px;
  z-index: 100;
  cursor: pointer;
`

export const ShareWrap = styled.div`
  width: 100%;
  position: absolute;
  bottom: 58px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  &.show-menu {
    visibility: visible;
    opacity: 1;
    
  }
  &.hide-menu {
    visibility: hidden;
    opacity: 0;
  }
`

export const SNSImg = styled.img`
  width: 30px;
  margin-right: 15px;
  &:hover {
    cursor: pointer;
  }
`