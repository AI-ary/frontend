import { Link } from 'react-router-dom';
import BookCover from '../../components/bookshape/BookCover';
import * as S from '../../styles/main/main.style'
import * as C from '../../styles/common/common.style'

function NonMemberMainPage() {
  return(
    <div style={{marginBottom:'60px'}}>
      <BookCover>
        <C.Control>
          <C.Titles>G.Diary</C.Titles>
          <S.ShowImage src='images/logo.png' />
          <S.LinkBox>
            <Link to='/signin' className='link'>로그인</Link>
            <Link to='/signup' className='link'>회원가입</Link>
            <Link to='/about' className='link'>소개</Link>
          </S.LinkBox>
        </C.Control>
      </BookCover>  
    </div>
  );
}

export default NonMemberMainPage;