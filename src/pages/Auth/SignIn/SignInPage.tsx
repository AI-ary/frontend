import SignInForm from './components/SignInForm';
import ClosedBook from '@/components/bookshape/ClosedBook';
import * as S from '../../../styles/auth/auth.style'
import { MdLockOutline } from "react-icons/md";

function SignIn() {
  return (
    <ClosedBook>
      <S.TitleWrap>
        <S.IconWrap>
          <MdLockOutline size={70}/>
        </S.IconWrap>
        <S.Title>로그인</S.Title>
      </S.TitleWrap>
      <SignInForm/>
    </ClosedBook>
  );
}

export default SignIn;