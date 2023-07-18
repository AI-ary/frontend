import BookCover from '../../../components/bookshape/BookCover';
import { Control, Titles } from '../../Main/NonMemberMainPage';
import SignInForm from './components/SignInForm';
import { LockOutlined } from '@mui/icons-material';
import styled from 'styled-components';

const Icon = styled.div`
  position: relative;
  bottom:135px;
  display: flex;
  align-items: center;
  justify-items: center;
`

function SignIn() {
  return(
    <BookCover>
      <Control>
        <Titles>로그인</Titles>
        <Icon>
          <LockOutlined style={{
            fontSize:'50px', 
            backgroundColor: '#F0DB6D',
            borderRadius: '50px'
          }}/>
        </Icon>
        <SignInForm />
      </Control>
    </BookCover>
  );
}

export default SignIn;