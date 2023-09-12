import {useEffect, useState} from 'react';
import { useStore } from '../../../store/store';
import * as D from '../../../styles/diary/diary.style';
import * as DW from '../../../styles/diary/diarywrite.style';

// AI로부터 받아온 그림들 중 원하는 그림 선택
function GrimChoice(){
  const {setChoiceImg, getGrimList} = useStore();
  const [keywordList, setKeywordList] = useState<any []>([]);
  const [selectedKeyword, setSelectedKeyword] = useState<string>('');
  const [grimList, setGrimList]=useState<any []>([]);

  useEffect(() => {
    setKeywordList(Object.keys(getGrimList));
    setSelectedKeyword(Object.keys(getGrimList)[0]);
  }, [getGrimList]);

  useEffect(()=>{
    setGrimList(getGrimList[selectedKeyword]);
  },[selectedKeyword]);

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
      </DW.Choice>
    </D.DiviContainer>)
}

export default GrimChoice;
