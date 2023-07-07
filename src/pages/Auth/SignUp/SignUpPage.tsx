import BookCover from '../../../components/bookshape/BookCover';
import { Control, Titles } from '../../Main/NonMemberMainPage';
import SignUpForm from './components/SignUpForm';
import { Person } from '@mui/icons-material';
import styled from 'styled-components'

const Icon = styled.div`
  position: relative;
  bottom:135px;
  display: flex;
  align-items: center;
  justify-items: center;
`

function SignUp() {
  return(
    <BookCover>
      <Control>
        <Titles>회원가입</Titles>
        <Icon>
          <Person style={{
            fontSize:'50px', 
            backgroundColor: '#F0DB6D', 
            borderRadius: '50px'
          }}/>
        </Icon>
        <SignUpForm/>
      </Control>
    </BookCover>
    
  );
}

export default SignUp;