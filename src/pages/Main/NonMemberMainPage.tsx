import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import * as S from '../../styles/main/main.style'
import ClosedBook from '@/components/bookshape/ClosedBook';

export const Control = styled.div`
display: flex;
justify-content : center;
flex-direction : column;
align-items : center;
position: relative;
top: 10px;`

export const Titles = styled.div`
display: flex;
justify-contents : center;
align-items : center;
font-size: 70px;`

function Main() {
  const navigate = useNavigate()
  return(
    <ClosedBook>
      <S.Content>어른들의 동심을 찾아라!</S.Content>
      <S.Aiary src='/images/aiary.png' alt='로고 이미지' />
      <S.Logo src='/images/rainbow.png' alt='로고 이미지' />
      <S.ButtonWrap>
        <S.SignInButton onClick={()=>navigate('/signin')}>로그인</S.SignInButton>
        <S.SignUpButton onClick={()=>navigate('/signup')}>회원가입</S.SignUpButton>
      </S.ButtonWrap>
    </ClosedBook>
  );
}

export default Main;