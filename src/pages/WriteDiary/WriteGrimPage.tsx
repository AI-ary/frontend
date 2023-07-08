import { useState } from 'react'
import DiaryContent from './components/DiaryContent';
import GrimChoice from '../WriteDiary/components/GrimChoice';
import Bookmark from '../../components/bookshape/Bookmark';
import Loading from '../../components/Loading';
import * as S from '../../styles/diary/diary.style';

function WriteGrim(){
  const [loading, setLoading]=useState<boolean>(false);
  const getLoading = (load:boolean) =>{
    setLoading(load);
  }
  return(
    <S.WriteContainer>
      {loading?<Loading />:''}
      <S.Book2Container> 
        <S.BookShape2Left>
          <GrimChoice />
        </S.BookShape2Left>
        <S.Line />
        <S.BookShape2Right>
          <DiaryContent getLoading={getLoading}/>
        </S.BookShape2Right>
        <Bookmark />
      </S.Book2Container>
    </S.WriteContainer>
  )
}

export default WriteGrim;