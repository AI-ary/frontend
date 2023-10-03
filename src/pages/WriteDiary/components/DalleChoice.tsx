import {useEffect, useState} from 'react';
import { useStore } from '../../../store/store';
import * as D from '../../../styles/diary/diary.style';
import * as DW from '../../../styles/diary/diarywrite.style';

// Dalle AI로부터 받아온 그림들 중 원하는 그림 선택
function DalleChoice() {
  const { setChoiceDalleImg, getDalleList} = useStore();
  const [dalleList, setDalleList] = useState<string[]>([]);
  const [selectedDalleIndex, setSelectedDalleIndex] = useState<number>(0);

  useEffect(()=>{
    setDalleList(getDalleList);
    setChoiceDalleImg(getDalleList[0]);
  },[getDalleList]);

  const changeDalleImg = (e: any, index: number) => {
    e.preventDefault();
    setSelectedDalleIndex(index);
    setChoiceDalleImg(e.target.src);
  }
  
  return(
    <D.DiviContainer>
      <DW.DalleTitle>
        Dall-E에서 가져온 이미지 중 <br/>
        마음에 드는 이미지를 선택하세요!
      </DW.DalleTitle>
      <DW.DalleWrap>
          {
            dalleList && dalleList.map((dalle, index) => (
              <DW.DalleGrim key={index} id="image" src={dalle}
              alt="grim" onClick={(e) => changeDalleImg(e, index)}
              style={{ border: index === selectedDalleIndex ? '4px solid #78ADE1' : '3px solid #FFFFFF'}}
              />
            ))
          }
      </DW.DalleWrap>
    </D.DiviContainer>
  )
}

export default DalleChoice;