import ClosedBook from '@/components/bookshape/ClosedBook';
import BookCover from '../../../components/bookshape/BookCover';
import { Control, Titles } from '../../Main/NonMemberMainPage';
import SignUpForm from './components/SignUpForm';
import { Person } from '@mui/icons-material';
import styled from 'styled-components'
import * as S from '../../../styles/auth/auth.style'
import { BsFillPersonFill } from "react-icons/bs";
import '../auth.css'

const Icon = styled.div`
  position: relative;
  bottom:135px;
  display: flex;
  align-items: center;
  justify-items: center;
`

function SignUp() {
  return (
    <ClosedBook>
      <S.TitleWrap>
        <BsFillPersonFill size={70} className='icon'/>
        <S.Title>회원가입</S.Title>
      </S.TitleWrap>
      <SignUpForm/>
    </ClosedBook>
    // <BookCover>
    //   <Control>
    //     <Titles>회원가입</Titles>
    //     <Icon>
    //       <Person style={{
    //         fontSize:'50px', 
    //         backgroundColor: '#F0DB6D', 
    //         borderRadius: '50px'
    //       }}/>
    //     </Icon>
    //     <SignUpForm/>
    //   </Control>
    // </BookCover>
    
  );
}

export default SignUp;