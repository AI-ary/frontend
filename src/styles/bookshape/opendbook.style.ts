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

