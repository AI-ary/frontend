import ClosedBook from '@/components/bookshape/ClosedBook';
import SignUpForm from './components/SignUpForm';
import * as S from '../../../styles/auth/auth.style'
import { BsFillPersonFill } from "react-icons/bs";

function SignUp() {
  return (
    <ClosedBook>
      <S.TitleWrap>
        <S.IconWrap>
          <BsFillPersonFill size={70} className='icon'/>
        </S.IconWrap>
        <S.Title>회원가입</S.Title>
      </S.TitleWrap>
      <SignUpForm/>
    </ClosedBook>
  );
}

export default SignUp;