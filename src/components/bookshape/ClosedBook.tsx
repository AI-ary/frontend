import { useNavigate } from 'react-router-dom';
import Bookmark from './Bookmark';
import * as S from '../../styles/bookshape/closedbook.style'
import { RiArrowLeftSLine } from 'react-icons/ri';

const ClosedBook = ({ children }: React.PropsWithChildren) => {
  const path = window.location.pathname;
  const navigate = useNavigate();
  return(
    <S.Container className='slide'>
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
        {/* <S.LabelWrap>
          <S.Label name={'홈'} path={path} onClick={()=>navigate('/')}>홈</S.Label>
          <S.Label name={'일기 쓰기'} path={path}>일기 쓰기</S.Label>
        </S.LabelWrap> */}
      </S.Flip>
    </S.Container>
  )
}

export default ClosedBook