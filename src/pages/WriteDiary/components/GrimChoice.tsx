import {useEffect, useState} from 'react';
import { useStore } from '../../../store/store';
import * as D from '../../../styles/diary/diary.style';
import * as DW from '../../../styles/diary/diarywrite.style';
import { MdArrowBackIosNew, MdArrowForwardIos } from "react-icons/md";

const NextArrow = (props: { onClick: () => void; isDisabled: boolean }) => {
  const {onClick, isDisabled} = props;
  return (
    <DW.Arrow className={`right ${isDisabled ? 'disabled': ''}`} onClick={onClick}>
      <MdArrowForwardIos size="12px" color='#FFFFFF'/>
    </DW.Arrow>
  )
}

const PrevArrow = (props: { onClick: () => void; isDisabled: boolean }) => {
  const {onClick, isDisabled} = props;
  return (
    <DW.Arrow className={`left ${isDisabled ? 'disabled': ''}`} onClick={onClick}>
      <MdArrowBackIosNew size="12px" color='#FFFFFF' />
    </DW.Arrow>
  )
}

// AI로부터 받아온 그림들 중 원하는 그림 선택
function GrimChoice(){
  const {setChoiceImg, setChoiceDalleImg, getGrimList, getDalleList} = useStore();
  const [keywordList, setKeywordList] = useState<any []>([]);
  const [selectedKeyword, setSelectedKeyword] = useState<string>('');
  const [grimList, setGrimList]=useState<any []>([]);
  const [dalleList, setDalleList] = useState<string[]>([]);
  const [currentSlide, setCurrentSlide] = useState<number>(0);

  useEffect(() => {
    const slider = document.querySelector('.slick-slider'); // 슬라이더 엘리먼트 선택
    if (slider) {
      slider.addEventListener('beforeChange', (e:any) => {
        const nextSlide = e.detail.currentSlide; // 다음으로 이동할 슬라이드 인덱스
        setCurrentSlide(nextSlide);
      });
    }
  }, []);

  const settings = {
    dots: false, // 슬라이드 밑에 점 여부
    infinite: false, // 무한 반복 여부
    speed: 500, // 속도
    slidesToShow: 4, // 4장씩 보이도록
    slidesToScroll: 4, // 4장씩 뒤로 넘어가게
    initialSlide: 0,
    arrows: true,
    vertical: false,
    centerPadding: "0px", // 0px 하면 슬라이드 끝쪽 이미지가 안잘림
    nextArrow: <NextArrow isDisabled={currentSlide >= grimList?.length - 4} onClick={function (): void {
      throw new Error('Function not implemented.');
    } } />,
    prevArrow: <PrevArrow isDisabled={currentSlide <= 0} onClick={function (): void {
      throw new Error('Function not implemented.');
    } } />,
  };

  useEffect(() => {
    setKeywordList(Object.keys(getGrimList));
    // setSelectedKeyword(Object.keys(getGrimList)[0]);
    setSelectedKeyword('카페');
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
      <DW.ChoiceWrap>
        <DW.ChoiceKeyword>
          <DW.StyledSlider {...settings}>
            <DW.Keyword isSelected={selectedKeyword === '카페'} onClick={()=>setSelectedKeyword('카페')}>카페</DW.Keyword>
            <DW.Keyword isSelected={selectedKeyword === '커피1'} onClick={()=>setSelectedKeyword('커피1')}>커피1</DW.Keyword>
            <DW.Keyword isSelected={selectedKeyword === '커피2'} onClick={()=>setSelectedKeyword('커피2')}>커피2</DW.Keyword>
            <DW.Keyword isSelected={selectedKeyword === '커피3'} onClick={()=>setSelectedKeyword('커피3')}>커피3</DW.Keyword>
            <DW.Keyword isSelected={selectedKeyword === '커피4'} onClick={()=>setSelectedKeyword('커피4')}>커피4</DW.Keyword>
            <DW.Keyword isSelected={selectedKeyword === '커피5'} onClick={()=>setSelectedKeyword('커피5')}>커피5</DW.Keyword>
          </DW.StyledSlider>
        {/* {keywordList && keywordList.map((x, index) => <div key={index} onClick={()=>setSelectedKeyword(x)}>{x}</div>)} */}
        </DW.ChoiceKeyword>
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
      </DW.ChoiceWrap>
    </D.DiviContainer>)
}

export default GrimChoice;
