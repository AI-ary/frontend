import { useNavigate } from 'react-router-dom';
import * as S from '../../styles/bookshape/closedbook.style'
import { RiArrowLeftSLine } from 'react-icons/ri';

const ClosedBook = ({ children }: React.PropsWithChildren) => {
  const path = window.location.pathname;
  const navigate = useNavigate();
  return(
    <S.Container>
      <S.Left />
      <S.Flip>
        <S.BackBtn path={path} onClick={()=>navigate(-1)}>
          <RiArrowLeftSLine size={70} />
        </S.BackBtn>
        <S.Mid>
          {children}
        </S.Mid>
        <S.Right />
        <S.LabelWrap>
          <S.Label name={'홈'} path={path} onClick={()=>navigate('/')}>홈</S.Label>
          <S.Label name={'일기 쓰기'} path={path}>일기 쓰기</S.Label>
        </S.LabelWrap>
      </S.Flip>
    </S.Container>
  )
}

export default ClosedBook