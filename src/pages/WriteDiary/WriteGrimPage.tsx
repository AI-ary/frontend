import { useState } from 'react'
import DiaryContent from './components/DiaryContent';
import GrimChoice from '../WriteDiary/components/GrimChoice';
import OpenBookLeft from '../../components/bookshape/OpenBookLeft';
import OpenBookRight from '../../components/bookshape/OpenBookRight';
import Bookmark from '../../components/bookshape/Bookmark';
import Loading from '../../components/Loading';
import * as O from '../../styles/bookshape/opendbook.style'
import * as C from '../../styles/bookshape/closedbook.style';

function WriteGrim(){
  const [loading, setLoading]=useState<boolean>(false);
  const getLoading = (load:boolean) =>{
    setLoading(load);
  }
  return(
    <C.Container>
      {loading?<Loading />:''}
      <O.OpenBookContainer> 
        <OpenBookLeft>
          <GrimChoice />
        </OpenBookLeft>
        <OpenBookRight>
          <DiaryContent getLoading={getLoading}/>
        </OpenBookRight>
        <Bookmark />
      </O.OpenBookContainer>
    </C.Container>
  )
}

export default WriteGrim;

