import BookCover from '../../../components/bookshape/BookCover';
import SignUpForm from './components/SignUpForm';
import { Person } from '@mui/icons-material';
import * as S from '../../../styles/auth/common/common.style'
import * as C from '../../../styles/common/common.style'

function SignUp() {
  return(
    <BookCover>
      <C.Control>
        <C.Titles>회원가입</C.Titles>
        <S.Icon>
          <Person style={{
            fontSize:'50px', 
            backgroundColor: '#F0DB6D', 
            borderRadius: '50px'
          }}/>
        </S.Icon>
        <SignUpForm/>
      </C.Control>
    </BookCover>
    
  );
}

export default SignUp;