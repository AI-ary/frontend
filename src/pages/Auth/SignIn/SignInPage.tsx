import BookCover from '../../../components/bookshape/BookCover';
import SignInForm from './components/SignInForm';
import { LockOutlined } from '@mui/icons-material';
import * as S from '../../../styles/auth/common/common.style'
import * as C from '../../../styles/common/common.style'

function SignIn() {
  return(
    <BookCover>
      <C.Control>
        <C.Titles>로그인</C.Titles>
        <S.Icon>
          <LockOutlined style={{
            fontSize:'50px', 
            backgroundColor: '#F0DB6D',
            borderRadius: '50px'
          }}/>
        </S.Icon>
        <SignInForm />
      </C.Control>
    </BookCover>
  );
}

export default SignIn;