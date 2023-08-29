import { useState, useEffect } from 'react';
import { useStore } from '../../../store/store';
import { useLocation, useNavigate } from 'react-router-dom';
import { addDiaryData, addDiaryImage, addTextData, getKeywordDrawingData } from '@/apis/writeDiary';
import { format } from 'date-fns';
import Swal from 'sweetalert2';
import Manuscript from './Manuscript';
import Emoji from './Emoji';
import Drawing from './Drawing';
import * as D from '../../../styles/diary/diary.style';
import * as DW from '../../../styles/diary/diarywrite.style';

import { ReactComponent as Sunny } from '../../../../public/images/sunny.svg';
import { ReactComponent as Cloud } from '../../../../public/images/cloud.svg';
import { ReactComponent as Rainy } from '../../../../public/images/rainy.svg';
import { ReactComponent as Snow } from '../../../../public/images/snow.svg';

type DiaryContentProps = {
  getLoading: (load: boolean) => void;
  startLoading: () => void
  loadingState: {
    current : boolean
  }
  isDisabled : boolean
};

interface RefObject {
  isDoubleClick: boolean;
}

function DiaryContent(props:DiaryContentProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const [grim, setGrim] = useState<boolean>(true); //그리기모드 버튼 클릭 여부
  const [title, setTitle] = useState<string>(''); //제목
  const [content, setContent] = useState<string>(''); //일기 내용
  const [weather, setWeather] = useState<number>(); //날씨 선택
  const { updateCanvas, setChoiceImg, setGetGrimList } = useStore();
  const [emoji, setEmoji] = useState<string>('');
  const [comContent, setComContent] = useState<string>('');
  const [send, setSend] = useState<boolean>(false);

  const getDayOfWeek = (date:string) => {
    const week=['일', '월', '화', '수', '목', '금', '토'];
    const dayOfWeek = week[new Date(date).getDay()];
    return dayOfWeek;
  }

  const rawDate = location.state?.date;
  let todayMonth = rawDate.getMonth() + 1; //월 구하기
  let todayDate = rawDate.getDate(); //일 구하기
  let todayDay = getDayOfWeek(rawDate);
  let date = format(rawDate, 'yyyy-MM-dd');

  //이모지 받아오기
  const getEmoji = (x:string) => {
    setEmoji(x);
  };

  // 캔버스 이미지(base64)를 다시 png로 변환하기
  let myImg = updateCanvas.replace('data:image/png;base64,', '');
  const byteString = atob(myImg);
  const array = [];
  for (let i = 0; i < byteString.length; i++) {
    array.push(byteString.charCodeAt(i));
  }
  const u8arr = new Uint8Array(array);
  const file = new Blob([u8arr], { type: 'image/png' });

  const user = sessionStorage.getItem('id') || ''; //세션에 저장되어 있는 user id받아오기

  //작성한 일기 보내기
  const {isSaveSuccess, isSaveError, addDiaryContent} = addDiaryData();
  const {isImgSuccess, addDiaryImgData} = addDiaryImage();

  const grimDiary = async () => {
    props.getLoading(true);
    let form = new FormData();
    form.append('user_id', user);
    form.append('title', title);
    form.append('weather', String(weather));
    form.append('emoji', emoji);
    form.append('contents', content);
    form.append('diary_date', date);
    addDiaryContent(form);
  }

  const drawingUrl = async () => {
    let form = new FormData();
    form.append('user_id', user);
    form.append('diary_date', date);
    form.append('file', file);
    addDiaryImgData(form);
  };

  useEffect(()=> {
    if(isSaveSuccess){
      drawingUrl();
    }
    if(isSaveError){
      props.getLoading(false);
    }
    if(isImgSuccess) {
      props.getLoading(false);
      setChoiceImg([]);
      setGetGrimList([]);
      navigate('/list');
    }
  },[isSaveSuccess, isSaveError, isImgSuccess]);
  
  //AI키워드 그림 가져오기 버튼
  const {isTextSuccess, addTextContent} = addTextData();
  const {isKeywordSuccess, data, isError} = getKeywordDrawingData({send, date ,user, comContent});

  const bringGrim = () => {
    // api 호출 중간에 멈출 수 있는지 여부에 따라 가져오기 취소 버튼 넣을지 말지 생각하기
    props.getLoading(true);
    props.startLoading()
    setComContent(content);
    setGetGrimList([]);
    const form = new FormData();
    form.append('user_id', user);
    form.append('diary_date', date);
    form.append('contents', content);
    addTextContent(form);
  }

  useEffect(()=>{
    if(isTextSuccess){
      setSend(true);
    }

    if (isKeywordSuccess) {
      const percent : HTMLElement | null = document.querySelector('#percent');
      const percentBar : HTMLElement | null = document.querySelector('#percentBar');
      if (percent !== null && percentBar !== null) {
        percent.textContent = '100%';
        percentBar.style.width = '100%';
      }
      setTimeout(() => {
        setGetGrimList(data);
        setSend(false);
        props.getLoading(false);
        props.loadingState.current = false
      },300)
    }

    if(isError && comContent === ''){
      props.getLoading(false);
      setSend(false);
      Swal.fire({
        position: 'center',
        icon: 'warning',
        title: '키워드에 맞는 이미지가 없습니다.',
        showConfirmButton: false,
        timer: 2000
      })
      props.loadingState.current = false
    }
  },[isTextSuccess, isKeywordSuccess, isError]);

  //제목 내용
  const onChange = (e:any) => {
    setTitle(e.target.value);
  };

  //날씨 선택
  const weatherChange = (weatherName:number) => {
    setWeather(weatherName);
  };
  //그리기 모드 버튼
  const clickedGrim = () => {
    setGrim((prev) => !prev);
  };

  interface WeatherBtnProps{
    mood: string;
    num: number;
  }

  function WeatherBtn({mood, num }:WeatherBtnProps) {
    return <D.WeatherRadioBtn type='radio' id={mood} checked={weather === num} onChange={() => weatherChange(num)} />;
  }

  return (
    <D.DiviContainer>
      <D.DiaryContainer>
        <D.DateContainer>
          <D.DateContent>{todayMonth}월 {todayDate}일 {todayDay}요일</D.DateContent>
          <D.WeatherWrap>
            <WeatherBtn mood='sunny' num={1} />
            <label htmlFor='sunny'><Sunny fill={weather===1 ? '#FF0000' : '#969696'} className='weather' /></label>
            <WeatherBtn mood={'cloudy'} num={2} />
            <label htmlFor='cloudy'><Cloud fill={weather===2 ? '#4E5D79' : '#969696'} className='weather' /></label>
            <WeatherBtn mood={'rainy'} num={3} />
            <label htmlFor='rainy'><Rainy fill={weather===3 ? '#5A5A5A' : '#969696'} className='weather' /></label>
            <WeatherBtn mood={'snow'} num={4} />
            <label htmlFor='snow'><Snow fill={weather===4 ? '#F5F5F5' : '#969696'} /></label>
          </D.WeatherWrap>
        </D.DateContainer>
        <D.TitleContainer>
          <D.Title>
            제목:
            <D.Titlecontent>
              <input type='text' onChange={onChange} value={title} />
            </D.Titlecontent>
          </D.Title>
          <Emoji getEmoji={getEmoji} />
        </D.TitleContainer>
        <D.Canvas>
          <Drawing grim={grim} />
          <DW.ButtonContainer >
            <DW.Modebutton onClick={bringGrim} disabled={props.isDisabled} isDisabled={props.isDisabled}>
              그림가져오기
            </DW.Modebutton>
            <DW.Modebutton onClick={clickedGrim} isDisabled={false}>
              {grim ? '그림그리기' : '스탑'}
            </DW.Modebutton>
            <DW.Savebutton
              onClick={grimDiary}>
              저장하기
            </DW.Savebutton>
          </DW.ButtonContainer>
        </D.Canvas>
        <D.Content>
          <Manuscript setContent={setContent} />
        </D.Content>
      </D.DiaryContainer>
    </D.DiviContainer>
  );
}

export default DiaryContent;

// TODO: Swal 사용 부분 query 호출 부분으로 넘기기
// TODO: send를 user_id 혹은 date로 enabled 확인가능하도록 변경하기