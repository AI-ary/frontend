import { useNavigate } from 'react-router-dom';
import Bookmark from './Bookmark';
import * as S from '../../styles/bookshape/closedbook.style'
import * as B from '../../styles/bookshape/opendbook.style'
import { RiArrowLeftSLine } from 'react-icons/ri';

const ClosedBook = ({ children }: React.PropsWithChildren) => {
  const path = window.location.pathname;
  const navigate = useNavigate();
  return(
    <S.Container className='slide'>
      <B.BookContainer style={path === '/main' ? { marginBottom: '100px' } : {}}>
        <S.Left/>
        <S.Flip className='flip'>
          <S.BackBtn path={path} onClick={()=>navigate(-1)}>
            <RiArrowLeftSLine size={70} />
          </S.BackBtn>
          <S.Mid>
            {children}
          </S.Mid>
          <S.Right />
          <Bookmark/>
        </S.Flip>                
      </B.BookContainer>

    </S.Container>
  )
}

export default ClosedBook