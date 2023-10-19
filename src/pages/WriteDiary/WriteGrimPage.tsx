import { useState } from 'react'
import DiaryContent from './components/DiaryContent';
import GrimChoice from '../WriteDiary/components/GrimChoice';
import OpenBookLeft from '../../components/bookshape/OpenBookLeft';
import OpenBookRight from '../../components/bookshape/OpenBookRight';
import Bookmark from '../../components/bookshape/Bookmark';
import * as O from '../../styles/bookshape/opendbook.style'
import * as C from '../../styles/bookshape/closedbook.style';
import DalleChoice from './components/DalleChoice';

function WriteGrim(){
  const [isSelectedDalle, setIsSelectedDalle] = useState<boolean>(false);

  const checkSelectedDalle = (check:boolean) => {
    setIsSelectedDalle(check);
  }
  return(
    <C.Container>
      <O.BookContainer> 
        <OpenBookLeft withClose={false}>
          {!isSelectedDalle ? <GrimChoice /> : <DalleChoice />}
        </OpenBookLeft>
        <OpenBookRight>
          <DiaryContent checkSelectedDalle={checkSelectedDalle} />
        </OpenBookRight>
        <Bookmark />
      </O.BookContainer>
    </C.Container>
  )
}

export default WriteGrim;

