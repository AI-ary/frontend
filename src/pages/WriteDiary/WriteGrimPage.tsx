import { useState, useRef } from 'react'
import DiaryContent from './components/DiaryContent';
import GrimChoice from '../WriteDiary/components/GrimChoice';
import OpenBookLeft from '../../components/bookshape/OpenBookLeft';
import OpenBookRight from '../../components/bookshape/OpenBookRight';
import Bookmark from '../../components/bookshape/Bookmark';
import * as O from '../../styles/bookshape/opendbook.style'
import * as C from '../../styles/bookshape/closedbook.style';
import DalleChoice from './components/DalleChoice';
import DiaryContent2 from './components/DiaryContent2';

interface DalleApiRef {
  bringDalleGrim: () => void;
}

function WriteGrim(){
  const dalleApiRef = useRef<DalleApiRef | null>(null);
  const [isSelectedDalle, setIsSelectedDalle] = useState<boolean>(false);

  const checkSelectedDalle = (check:boolean) => {
    setIsSelectedDalle(check);
  }

  const handleDalleAPI = () => {
    dalleApiRef.current?.bringDalleGrim();
  }

  return(
    <C.Container>
      <O.BookContainer> 
        <OpenBookLeft withClose={false}>
          {/* {!isSelectedDalle ? <GrimChoice /> : <DalleChoice />} */}
          <DalleChoice handleDalleAPI={handleDalleAPI} />
        </OpenBookLeft>
        <OpenBookRight>
          {/* <DiaryContent checkSelectedDalle={checkSelectedDalle} /> */}
          <DiaryContent2 ref={dalleApiRef} checkSelectedDalle={checkSelectedDalle} />
        </OpenBookRight>
        <Bookmark />
      </O.BookContainer>
    </C.Container>
  )
}

export default WriteGrim;

