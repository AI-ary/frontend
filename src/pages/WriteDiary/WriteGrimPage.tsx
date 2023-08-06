import { useState } from 'react'
import DiaryContent from './components/DiaryContent';
import GrimChoice from '../WriteDiary/components/GrimChoice';
import BookShape2L from '../../components/bookshape/OpenBookLeft';
import BookShape2R from '../../components/bookshape/OpenBookRight';
import Bookmark from '../../components/bookshape/Bookmark';
import Loading from '../../components/Loading';
import * as O from '../../styles/bookshape/opendbook.style'

function WriteGrim(){
  const [loading, setLoading]=useState<boolean>(false);
  const getLoading = (load:boolean) =>{
    setLoading(load);
  }
  return(
    <O.WriteContainer>
      {loading?<Loading />:''}
      <O.Book2Container> 
        <BookShape2L>
          <GrimChoice />
        </BookShape2L>
        <BookShape2R>
          <DiaryContent getLoading={getLoading}/>
        </BookShape2R>
        <Bookmark />
      </O.Book2Container>
    </O.WriteContainer>
  )
}

export default WriteGrim;

