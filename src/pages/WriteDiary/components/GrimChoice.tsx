import {useEffect, useState} from 'react';
import { useStore } from '../../../store/store';
import * as D from '../../../styles/diary/diary.style';
import * as DW from '../../../styles/diary/diarywrite.style';
import { MdArrowBackIosNew, MdArrowForwardIos } from "react-icons/md";

// AI로부터 받아온 그림들 중 원하는 그림 선택
function GrimChoice() {
  const {setChoiceImg, getGrimList } = useStore();
  const [keywordList, setKeywordList] = useState<any []>([]);
  const [selectedKeyword, setSelectedKeyword] = useState<string>('');
  const [grimList, setGrimList]=useState<any []>([]);
  const [currentSlide, setCurrentSlide] = useState<number>(0);

  // useEffect(() => {
  //   const slider = document.querySelector('.slick-slider'); // 슬라이더 엘리먼트 선택
  //   if (slider) {
  //     slider.addEventListener('beforeChange', (e:any) => {
  //       const nextSlide = e.detail.currentSlide; // 다음으로 이동할 슬라이드 인덱스
  //       setCurrentSlide(nextSlide);
  //     });
  //   }
  // }, []);

  const NextArrow = (props: { onClick: () => void; isDisabled: boolean }) => {
    const {onClick, isDisabled} = props;
    const handleNextClick = () => {
      onClick();
      if(currentSlide<keywordList?.length-1){
        setCurrentSlide(currentSlide+4);
      }
    }
    return (
      <DW.Arrow className={`right ${isDisabled ? 'disabled': ''}`} onClick={handleNextClick}>
        <MdArrowForwardIos size="12px" color='#FFFFFF'/>
      </DW.Arrow>
    )
  }
  
  const PrevArrow = (props: { onClick: () => void; isDisabled: boolean }) => {
    const {onClick, isDisabled} = props;
    const handlePrevClick = () => {
      onClick();
      if(currentSlide>0){
        setCurrentSlide(currentSlide-4);
      }
    }
    return (
      <DW.Arrow className={`left ${isDisabled ? 'disabled': ''}`} onClick={handlePrevClick}>
        <MdArrowBackIosNew size="12px" color='#FFFFFF' />
      </DW.Arrow>
    )
  }
console.log(currentSlide);

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
    nextArrow: <NextArrow isDisabled={currentSlide >= keywordList?.length - 4} onClick={function (): void {
      throw new Error('Function not implemented.');
    } } />,
    prevArrow: <PrevArrow isDisabled={currentSlide <= 0} onClick={function (): void {
      throw new Error('Function not implemented.');
    } } />,
  };

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
        'AIARY가 분석한 그림이에요!'
      </DW.Choicetitle>
      <DW.ChoiceWrap>
        {keywordList.length>0 && <DW.ChoiceKeyword> 
          <DW.StyledSlider {...settings}>
            {keywordList && keywordList.map((x, index) => <DW.Keyword isSelected={selectedKeyword === x} key={index} onClick={()=>setSelectedKeyword(x)}><p>{x}</p>{x}</DW.Keyword>)}
          </DW.StyledSlider>
        </DW.ChoiceKeyword>
        }
        <DW.Choice isKeywordList={keywordList.length > 0}>
          {
            grimList && grimList.map((data,index)=>
              (
                <DW.ChoiceGrim key={index} id="image" src={data}
                  alt="grim" onClick={onChange} crossOrigin="anonymous"/>
              ))
          }
        </DW.Choice>
      </DW.ChoiceWrap>
    </D.DiviContainer>
  )
}

export default GrimChoice;