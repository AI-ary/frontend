import styled from 'styled-components';
import { useState, useRef } from 'react';

interface Props {
  isLoading : boolean
  setIsLoading : React.Dispatch<React.SetStateAction<boolean>>
  cancelLoading : any
}

function Loading({isLoading,setIsLoading,cancelLoading} : Props) {
  // const [isLoading, setIsLoading] = useState<boolean>(false);
  return (
    <div
      style={{
        position: 'fixed',
        backgroundColor: 'rgba(1, 1, 1, 0.5)',
        width: '100vw',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        left: '0px',
        top: '0px',
        flexDirection: 'column',
        zIndex:100
      }}
    >
      <h1 id='percent' style={{ fontSize: '100px', color: 'white' }}>
            0%
      </h1>
      <div style={{ width: '50%', backgroundColor: 'white' }}>
        <div id='percentBar' style={{ width: '0', height: '50px', backgroundColor: 'orange', transition: 'width 0.5s' }}></div>
      </div>
      <button onClick={cancelLoading} style={{ fontSize: '50px', color: 'white' }}>
            가져오기 취소
      </button>
    </div>
  );
};
const Background = styled.div`
  position: absolute;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  // background: #F1F2F3;
  background: #ffffffb7;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-size: cover;
  z-index:99;
`;
const LoadingText = styled.div`
  // font: 2rem "Noto Sans KR";
  font: "Noto Sans KR";
  font-size: 40px;
  text-align: center;
  font-weight: 700;
`;
export default Loading;