import { useNavigate } from 'react-router-dom';
import * as S from '../../styles/bookshape/closedbook.style'
import { RiArrowLeftSLine } from 'react-icons/ri';
import Bookmark from './Bookmark';


const ClosedBook = ({ children }: React.PropsWithChildren) => {
  const path = window.location.pathname;
  const home = { name: '홈', path : path }
  const write = { name: '일기 쓰기', path: path }
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
        <Bookmark />
        {/* <S.LabelWrap>
                    <S.Label name={'홈'} path={path} onClick={()=>navigate('/')}>홈</S.Label>
                    <S.Label name={'일기 쓰기'} path={path} >일기 쓰기</S.Label>
                </S.LabelWrap> */}
      </S.Flip>
    </S.Container>
  )
}

export default ClosedBook