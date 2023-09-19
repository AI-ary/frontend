import {useEffect, useState} from 'react';
import { useStore } from '../../../store/store';
import * as D from '../../../styles/diary/diary.style';
import * as DW from '../../../styles/diary/diarywrite.style';

// AI로부터 받아온 그림들 중 원하는 그림 선택
function GrimChoice(){
  const {setChoiceImg, setChoiceDalleImg, getGrimList, getDalleList} = useStore();
  const [keywordList, setKeywordList] = useState<any []>([]);
  const [selectedKeyword, setSelectedKeyword] = useState<string>('');
  const [grimList, setGrimList]=useState<any []>([]);
  const [dalleList, setDalleList] = useState<string[]>([]);
  useEffect(() => {
    setKeywordList(Object.keys(getGrimList));
    setSelectedKeyword(Object.keys(getGrimList)[0]);
  }, [getGrimList]);

  useEffect(()=>{
    setGrimList(getGrimList[selectedKeyword]);
  },[selectedKeyword]);

  useEffect(()=>{
    setDalleList(getDalleList);
    setChoiceDalleImg(getDalleList[0])
  },[getDalleList]);

  const addImage = (srcImg:any) => {
    const newimage = new Image();
    const image=srcImg.src;
    const timestamp = new Date().getTime();
    const imageWithTimestamp=image.includes('?') ? `${image}&v=${timestamp}` : `${image}?v=${timestamp}`;
    newimage.src=imageWithTimestamp;
    newimage.crossOrigin = 'Anonymous';

    setChoiceImg([{
      id: srcImg.alt,
      img: newimage.src,
      x:0,
      y:0,
      width: srcImg.width,
      height: srcImg.height,
    }]
    )
  };
  
  const onChange = (e:any) => {
    e.preventDefault();
    addImage(e.target);
  };

  const changeDalleImg = (e: any) => {
    e.preventDefault();
    setChoiceDalleImg(e.target.src);
  }  
  return(
    <D.DiviContainer>
      <DW.Choicetitle>
        AIARY가 분석한 그림이에요!
      </DW.Choicetitle>
      {keywordList && keywordList.map((x, index) => <div key={index} onClick={()=>setSelectedKeyword(x)}>{x}</div>)}
      <DW.Choice>
        {
          grimList && grimList.map((data,index)=>
            (
              <DW.ChoiceGrim key={index} id="image" src={data}
                alt="grim" onClick={onChange} crossOrigin="anonymous"/>
            ))
        }
        {
          dalleList && dalleList.map((dalle, index) => (
            <DW.ChoiceGrim key={index} id="image" src={dalle}
            alt="grim" onClick={changeDalleImg} crossOrigin="anonymous"/>
          ))
        }
      </DW.Choice>
    </D.DiviContainer>)
}

export default GrimChoice;
