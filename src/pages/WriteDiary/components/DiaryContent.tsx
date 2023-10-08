import { useState, useEffect } from 'react';
import { useStore } from '../../../store/store';
import { useLocation, useNavigate } from 'react-router-dom';
import { addDiaryData } from '@/apis/writeDiary';
import { addKonlpyTextData, sendKonlpyPollingData, getKonlpyDrawingData } from '@/apis/konlpy';
import { addDalleTextData, sendDallePollingData, getDalledDrawingData } from '@/apis/dalle';
import { format } from 'date-fns';
import Swal from 'sweetalert2';
import Manuscript from './Manuscript';
import Emoji from './Emoji';
import Drawing from './Drawing';
import * as D from '../../../styles/diary/diary.style';
import * as DW from '../../../styles/diary/diarywrite.style';
import Modal from '@/components/Modal';


type DiaryContentProps = {
  checkSelectedDalle: (check:boolean) => void;
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
  const [grim, setGrim] = useState<boolean>(false); //그리기모드 버튼 클릭 여부
  const [btnType, setBtnType] = useState<number>(0); //그림 ai 타입 결정
  const [title, setTitle] = useState<string>(''); //제목
  const [content, setContent] = useState<string>(''); //일기 내용
  const [weather, setWeather] = useState<string>(); //날씨 선택
  const { updateCanvas, choiceDalleImg, confirmWeather, confirmTitle, confirmContents,limitWordLength, setChoiceImg, setChoiceDalleImg, setGetGrimList, setGetDalleList,  setConfirmContents } = useStore();
  const [emoji, setEmoji] = useState<string>('');

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

  //작성한 일기 보내기
  const {isSaveSuccess, isSaveError, addDiaryContent} = addDiaryData();

  const grimDiary = async () => {
    let file;
    if(choiceDalleImg){
      const response = await fetch(choiceDalleImg);
      console.log(response);
      const u8arr = new Uint8Array(await response.arrayBuffer());
      file = new Blob([u8arr], { type: 'image/png' });
    }else{
      // 캔버스 이미지(base64)를 다시 png로 변환하기
      let myImg = updateCanvas.replace('data:image/png;base64,', '');
      const byteString = atob(myImg);
      const array = [];
      for (let i = 0; i < byteString.length; i++) {
        array.push(byteString.charCodeAt(i));
      }
      const u8arr = new Uint8Array(array);
      file = new Blob([u8arr], { type: 'image/png' });
    }
    let form = new FormData();
    form.append('file', file);
    const sendData = {
      "title": title,
      "weather": weather,
      "emoji": emoji,
      "contents": content,
      "diary_date": date,
    }
    const jsonBlob = new Blob([JSON.stringify(sendData)], { type: 'application/json' });
    form.append('createRequest', jsonBlob);
    addDiaryContent(form);
  }
  useEffect(()=> {
    if(isSaveSuccess){
      props.getLoading(false);
      setChoiceImg([]);
      setChoiceDalleImg('');
      setGetDalleList([]);
      setGetGrimList([]);
      navigate('/list');
    }
    if(isSaveError){
      props.getLoading(false);
    }
  },[isSaveSuccess, isSaveError]);

  //AI키워드 그림 가져오기 버튼
  const { isKonlpyTextSuccess, isKonlpyTextError, konlpyTaskId, addKonlpyTextContent } = addKonlpyTextData();
  const { isKonlpyPollingSuccess, konlpyState, sendKonlpyPollingState } = sendKonlpyPollingData();
  const { isGetKonlpyImgSuccess, isGetKonlpyImgError, konlpyImg, getKonlpyImg } = getKonlpyDrawingData ();

  //Dalle 그림 가져오기 버튼
  const {isDalleTextSuccess, isDalleTextError, dalleTaskId, addDalleTextContent} = addDalleTextData();
  const {isDallePollingSuccess, dalleState, sendDallePollingState} = sendDallePollingData();
  const {isGetDalleImgSuccess, dalleImg, getDalleImg} = getDalledDrawingData();

  const bringGrim = () => {
    // props.getLoading(true);
    // props.startLoading();
    props.checkSelectedDalle(false);
    if(btnType === 2){
      if(confirm('달리 그림이 사라질 수 있습니다. 정말 초기화 하시겠습니까?')){
        setBtnType(1);
        setChoiceImg([]);
        setChoiceDalleImg('');
        setGetGrimList([]);
        setGetDalleList([]);
        addKonlpyTextContent(content);
      }else{
        alert('취소를 누르셨습니다.');
        console.log(btnType)
      }
    }else{
      setBtnType(1);
      setChoiceImg([]);
      setGetGrimList([]);
      setGetDalleList([]);
      addKonlpyTextContent(content);
    }  
  }

  useEffect(()=>{
    if(isKonlpyTextSuccess && konlpyTaskId){
      // setSend(true);
      sendKonlpyPollingState(konlpyTaskId);
      // if (isKeywordSuccess) {
      //   const percent : HTMLElement | null = document.querySelector('#percent');
      //   const percentBar : HTMLElement | null = document.querySelector('#percentBar');
      //   if (percent !== null && percentBar !== null) {
      //     percent.textContent = '100%';
      //     percentBar.style.width = '100%';
      //   }
      //   setTimeout(() => {
      //     setGetGrimList(data);
      //     setSend(false);
      //     props.getLoading(false);
      //     props.loadingState.current = false
      //   },300)
      // }
  
      // if(isError && comContent === ''){
      //   props.getLoading(false);
      //   setSend(false);
      //   Swal.fire({
      //     position: 'center',
      //     icon: 'warning',
      //     title: '키워드에 맞는 이미지가 없습니다.',
      //     showConfirmButton: false,
      //     timer: 2000
      //   })
      //   props.loadingState.current = false
      // }
    }
    if(isKonlpyTextError) {
      props.getLoading(false);
      props.loadingState.current = false
      Swal.fire({
        position: 'center',
        icon: 'warning',
        title: '텍스트 전송 실패.',
        showConfirmButton: false,
        timer: 2000
      })
    }
  },[isKonlpyTextSuccess, isKonlpyTextError]);

  useEffect(()=>{
    let intervalId: any;
    if(isKonlpyPollingSuccess) {
      console.log(konlpyState);
      intervalId = setInterval(() => {
        sendKonlpyPollingState(konlpyTaskId);
      }, 2000);
      if (konlpyState === 'SUCCESS') {
        clearInterval(intervalId);
        getKonlpyImg(konlpyTaskId);
      }
    }
    return () => {
      clearInterval(intervalId);
    }
  },[isKonlpyPollingSuccess, konlpyTaskId, konlpyState]);

  useEffect(()=>{
    if(isGetKonlpyImgSuccess){
      if(Object.keys(konlpyImg).length !== 0){
        setGetGrimList(konlpyImg);
      }else{
        Swal.fire({
          position: 'center',
          icon: 'warning',
          title: '키워드에 맞는 이미지가 없습니다.',
          showConfirmButton: false,
          timer: 2000
        });
      }
    }
    if(isGetKonlpyImgError){
      console.log('가져오기 실패');
    }
  },[isGetKonlpyImgSuccess, isGetKonlpyImgError]);

  // 달리 가져오기
  const bringDalleGrim = () => {
    if(content===''){
      setConfirmContents(true);
      return;
    }
    // props.getLoading(true);
    // props.startLoading();
    props.checkSelectedDalle(true);
    if(btnType === 1){
      if(confirm('키워드 그림이 사라질 수 있습니다. 정말 초기화 하시겠습니까?')){
        setBtnType(2);
        setChoiceImg([]);
        setGetGrimList([]);
        setChoiceDalleImg('');
        setGetDalleList([]);
        addDalleTextContent(content);
      }else{
        alert('취소를 누르셨습니다.');
        console.log(btnType)
      }
    }else{
      setBtnType(2);
      setChoiceImg([]);
      setGetGrimList([]);
      setChoiceDalleImg('');
      setGetDalleList([]);
      addDalleTextContent(content);
    }  
  }

  useEffect(()=>{
    if(isDalleTextSuccess && dalleTaskId){
      // setSend(true);
      sendDallePollingState(dalleTaskId);
      // if (isKeywordSuccess) {
      //   const percent : HTMLElement | null = document.querySelector('#percent');
      //   const percentBar : HTMLElement | null = document.querySelector('#percentBar');
      //   if (percent !== null && percentBar !== null) {
      //     percent.textContent = '100%';
      //     percentBar.style.width = '100%';
      //   }
      //   setTimeout(() => {
      //     setGetGrimList(data);
      //     setSend(false);
      //     props.getLoading(false);
      //     props.loadingState.current = false
      //   },300)
      // }
  
      // if(isError && comContent === ''){
      //   props.getLoading(false);
      //   setSend(false);
      //   Swal.fire({
      //     position: 'center',
      //     icon: 'warning',
      //     title: '키워드에 맞는 이미지가 없습니다.',
      //     showConfirmButton: false,
      //     timer: 2000
      //   })
      //   props.loadingState.current = false
      // }
    }
    if(isDalleTextError) {
      props.getLoading(false);
      props.loadingState.current = false
      Swal.fire({
        position: 'center',
        icon: 'warning',
        title: '텍스트 전송 실패.',
        showConfirmButton: false,
        timer: 2000
      })
    }
  },[isDalleTextSuccess, isDalleTextError]);
  useEffect(()=>{
    let intervalId: any;
    if(isDallePollingSuccess) {
      console.log(dalleState);
      intervalId = setInterval(() => {
        sendDallePollingState(dalleTaskId);
      }, 8000);
      if (dalleState === 'SUCCESS') {
        clearInterval(intervalId);
        getDalleImg(dalleTaskId);
      }
    }
    return () => {
      clearInterval(intervalId);
    }
  },[isDallePollingSuccess, dalleTaskId, dalleState]);

  useEffect(()=>{
    if(isGetDalleImgSuccess){
      setGetDalleList(dalleImg);
      console.log(dalleImg);
    }
  },[isGetDalleImgSuccess]);

  //제목 내용
  const onChange = (e:any) => {
    setTitle(e.target.value);
  };

  //날씨 선택
  const weatherChange = (weatherName:string) => {
    setWeather(weatherName);
  };

  interface WeatherBtnProps{
    mood: string;
  }

  function WeatherBtn({mood}:WeatherBtnProps) {
    return <D.WeatherRadioBtn type='radio' id={mood} checked={weather === mood} onChange={() => weatherChange(mood)} />;
  }

  return (
    <D.DiviContainer>
      <D.DiaryContainer>
        <D.DateContainer>
          <D.DateContent>{todayMonth}월 {todayDate}일 {todayDay}요일</D.DateContent>
          <D.WeatherWrap>
            <WeatherBtn mood='SUNNY'/>
            <label htmlFor='SUNNY'><D.StyledSunny fill={weather === 'SUNNY' ? '#FF0000' : '#969696'} className='weather' /></label>
            <WeatherBtn mood='CLOUDY' />
            <label htmlFor='CLOUDY'><D.StyledCloudy fill={weather === 'CLOUDY' ? '#4E5D79' : '#969696'} className='weather' /></label>
            <WeatherBtn mood='RAIN' />
            <label htmlFor='RAIN'><D.StyledRainy fill={weather=== 'RAIN' ? '#5A5A5A' : '#969696'} className='weather' /></label>
            <WeatherBtn mood='SNOW' />
            <label htmlFor='SNOW'><D.StyledSnow fill={weather === 'SNOW' ? '#98ffed' : '#969696'} /></label>
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
            {!grim ? (
              <>
                <DW.Modebutton onClick={bringDalleGrim} disabled={props.isDisabled} isDisabled={props.isDisabled}>
                  Dall-E 가져오기
                </DW.Modebutton><DW.Modebutton onClick={bringGrim} disabled={props.isDisabled} isDisabled={props.isDisabled}>
                  그림가져오기
                </DW.Modebutton>
                {
                  btnType !== 2 ? (
                    <DW.Modebutton onClick={()=> { setGrim(true);  props.checkSelectedDalle(false);}} isDisabled={false}>
                      그림 그리기
                  </DW.Modebutton>
                  ): undefined
                }
                <DW.Savebutton
                  onClick={grimDiary}>
                  저장하기
                </DW.Savebutton>
              </>): 
              <DW.Savebutton onClick={()=> setGrim(false)}>
                완료
              </DW.Savebutton>}
          </DW.ButtonContainer>
        </D.Canvas>
        <D.Content>
          <Manuscript setContent={setContent} />
        </D.Content>
      </D.DiaryContainer>
      {confirmWeather && <Modal onClick={()=>{}} icon='warning' version='one_btn' title="날씨를 선택해 주세요." content="" />}
      {confirmTitle && <Modal onClick={()=>{}} icon='warning' version='one_btn' title="제목을 입력해 주세요." content="" />}
      {confirmContents && <Modal onClick={()=>{}} icon='warning' version='one_btn' title="내용을 입력해 주세요." content="" />}
      {limitWordLength && <Modal onClick={()=>{}} icon='warning' version='one_btn' title="50글자 이하로 작성해 주세요." content="" />}
    </D.DiviContainer>
  );
}

export default DiaryContent;

// TODO: Swal 사용 부분 query 호출 부분으로 넘기기