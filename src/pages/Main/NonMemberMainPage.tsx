import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import * as S from '../../styles/main/main.style';
import * as C from '../../styles/common.style';
import ClosedBook from '@/components/bookshape/ClosedBook';
import { useState } from 'react';

export const Control = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  position: relative;
  top: 10px;
`;

export const Titles = styled.div`
  display: flex;
  justify-contents: center;
  align-items: center;
  font-size: 70px;
`;

function Main() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  
  let i: any;
  let tmp: any;
  let per: any;
  let timer: any;

  console.log(isLoading)
  if (!isLoading) {
    clearInterval(timer)
  }
  const startLoading = () => {
    setIsLoading(true);
    console.log('start');
    i = Math.floor(Math.random() * 5 + 1);
    timer = setInterval(() => {
      console.log(i);
      tmp = document.querySelector('#test');
      per = document.querySelector('#per');
      console.log(isLoading)
      if (tmp !== null && per !== null) {
        tmp.textContent = `${i}%`;
        per.style.width = `${i}%`;
      }
      i += Math.floor(Math.random() * 20 + 1);
      if (i > 100) {
        console.log('넘음');
        clearInterval(timer);
        tmp.textContent = '100%';
        per.style.width = '100%';
        setTimeout(() => {
          setIsLoading(false);
        }, 500);
      }
    }, 1000); 
  };
  
  const cancelLoading = () => {
    console.log('cancel');
    clearInterval(timer);
    setIsLoading(false);
  };
  return (
    <ClosedBook>
      <S.Content>어른들의 동심을 찾아라!</S.Content>
      <S.Aiary src='/images/aiary.png' alt='로고 이미지' />
      <S.Logo src='/images/rainbow.png' alt='로고 이미지' />
      <S.ButtonWrap>
        <C.CommonFilledBtn onClick={() => navigate('/signin')} isValid={false}>
          로그인
        </C.CommonFilledBtn>
        <C.CommonOutlinedBtn onClick={() => navigate('/signup')}>회원가입</C.CommonOutlinedBtn>
      </S.ButtonWrap>
      <button onClick={startLoading}>그림 가져오기</button>
      {isLoading && (
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
          }}
        >
          <h1 id='test' style={{ fontSize: '100px', color: 'white' }}>
            0%
          </h1>
          <div style={{ border: '1px solid black', width: '50%', backgroundColor: 'white' }}>
            <div id='per' style={{ border: '1px solid black', width: '0', height: '50px', backgroundColor: 'orange', transition: 'width 0.5s' }}></div>
          </div>
          <button onClick={cancelLoading} style={{ fontSize: '50px', color: 'white' }}>
            가져오기 취소
          </button>
        </div>
      )}
    </ClosedBook>
  );
}

export default Main;
