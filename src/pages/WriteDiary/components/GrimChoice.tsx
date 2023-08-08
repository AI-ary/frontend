import {useEffect, useState} from 'react';
import { useStore } from '../../../store/store';
import * as D from '../../../styles/diary/diary.style';
import * as DW from '../../../styles/diary/diarywrite.style';

interface Grim{
  image_url:string;
}
// AI로부터 받아온 그림들 중 원하는 그림 선택
function GrimChoice(){
  const {setChoiceImg, getGrimList}=useStore();
  const grim:any[] = Object.values(getGrimList);
  const [grimlist, setGrimList]=useState<Grim[]>([]);
  const img: string[] = [];
  
  useEffect(()=>{
    setGrimList(grim[1]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getGrimList])
  
  if(grimlist!==undefined){
    grimlist && grimlist.map((grim: Grim,index:number)=>(
      // img.push(grimlist[index].image_url)
      img.push(grim.image_url)
    ))
  }

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
      {/* <DW.Choice>
        {
          img && img.map((data,index)=>
            (
              <DW.ChoiceGrim key={index} id="image" src={data}
                alt="grim" onClick={onChange} crossOrigin="anonymous"/>
            ))
        }
      </DW.Choice> */}
    </D.DiviContainer>)
}

export default GrimChoice;
