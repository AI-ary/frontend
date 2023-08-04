import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import * as S from '../../styles/main/main.style'
import * as C from '../../styles/common.style'
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
        <C.CommonFilledBtn onClick={()=>navigate('/signin')} isValid={false}>로그인</C.CommonFilledBtn>
        <C.CommonOutlinedBtn onClick={()=>navigate('/signup')}>회원가입</C.CommonOutlinedBtn>
      </S.ButtonWrap>
    </ClosedBook>
  );
}

export default Main;