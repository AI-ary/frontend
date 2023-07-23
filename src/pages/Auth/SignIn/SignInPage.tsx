import SignInForm from './components/SignInForm';
import ClosedBook from '@/components/bookshape/ClosedBook';
import * as S from '../../../styles/auth/auth.style'
import { MdLockOutline } from "react-icons/md";
import '../auth.css'

function SignIn() {
  return (
    <ClosedBook>
      <S.TitleWrap>
        <MdLockOutline size={70} className='icon'/>
        <S.Title>로그인</S.Title>
      </S.TitleWrap>
      <SignInForm/>
    </ClosedBook>
  );
}

export default SignIn;