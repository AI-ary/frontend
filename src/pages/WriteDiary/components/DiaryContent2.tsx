import { useState, useEffect, useRef, forwardRef, useImperativeHandle } from 'react';
import { useStore } from '../../../store/store';
import { useLocation, useNavigate } from 'react-router-dom';
import { addDiaryData } from '@/apis/writeDiary';
import { addDalleTextData, sendDallePollingData, getDalledDrawingData } from '@/apis/dalle';
import { format } from 'date-fns';
import Manuscript from './Manuscript';
import Emoji from './Emoji';
import Drawing from './Drawing';
import * as D from '../../../styles/diary/diary.style';
import * as DW from '../../../styles/diary/diarywrite.style';
import Modal from '@/components/Modal';
import KonlplyLoading from '@/components/KonlpyLoading';

type DiaryContentProps = {
  checkSelectedDalle: (check:boolean) => void;
};

interface RefObject {
  isDoubleClick: boolean;
  bringDalleGrim: () => void;
}

function DiaryContent2(props:DiaryContentProps, ref: any) {
  const navigate = useNavigate();
  const location = useLocation();
  const [grim, setGrim] = useState<boolean>(false); //그리기모드 버튼 클릭 여부
  const [btnType, setBtnType] = useState<number>(0); //그림 ai 타입 결정 (2번이 Dall-e 모드)
  const [title, setTitle] = useState<string>(''); //제목
  const [content, setContent] = useState<string>(''); //일기 내용
  const [weather, setWeather] = useState<string>(); //날씨 선택
  const { updateCanvas, getDalleList, choiceDalleImg, confirmWeather, confirmTitle, confirmContents,limitWordLength, bringGrimWarning, bringMoreDalleWarning, loading, setChoiceDalleImg, setGetDalleList,  setConfirmContents, setBringGrimWarning, setBringMoreDalleWarning, setLoading } = useStore();
  const [emoji, setEmoji] = useState<string>('');
  const [textSendingError, setTextSendingError] = useState<boolean>(false);  // 텍스트 전송 실패
  const [modalTitle, setModalTitle] = useState<string>('');
  const [modalContent, setModalContent] = useState<string>('');
  const variables = useRef<RefObject>({isDoubleClick: false, bringDalleGrim: () => {}}); // 더블 클릭 방지 변수

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

  useImperativeHandle(ref, () => ({
    bringDalleGrim,
  }));

  //이모지 받아오기
  const getEmoji = (x:string) => {
    setEmoji(x);
  };

  //작성한 일기 보내기
  const {isSaveSuccess, addDiaryContent} = addDiaryData();

  const grimDiary = async () => {
    // 더블 클릭 방지 로직
    if(variables.current.isDoubleClick) return;
    variables.current.isDoubleClick = true;
    let file;
    if(choiceDalleImg){
      const response = await fetch(choiceDalleImg);
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
      'title': title,
      'weather': weather,
      'emoji': emoji,
      'contents': content,
      'diary_date': date,
    }
    const jsonBlob = new Blob([JSON.stringify(sendData)], { type: 'application/json' });
    form.append('createRequest', jsonBlob);
    addDiaryContent(form);
  }
  useEffect(()=> {
    if(isSaveSuccess){
      setChoiceDalleImg('');
      setGetDalleList([]);
      variables.current.isDoubleClick = false;
      navigate('/list');
    }
  },[isSaveSuccess]);

  //Dalle 그림 가져오기 버튼
  const {isDalleTextSuccess, isDalleTextError, dalleTaskId, addDalleTextContent} = addDalleTextData();
  const {isDallePollingSuccess, dalleState, sendDallePollingState} = sendDallePollingData();
  const {isGetDalleImgSuccess, dalleImg, getDalleImg} = getDalledDrawingData();

  const resetImgList = (isKonlply : number) => {
    setChoiceDalleImg('');
    setGetDalleList([]);
    setModalTitle(btnType === 2 ? '달리를 가져오게 되면 기존 그림이 사라집니다.' : '그림을 그리시게 되면 달리 그림이 사라집니다.')
    setModalContent(btnType === 2 ? '달리에서 이미지를 가져올까요?' : '그림 그리시겠습니까?')
    if(isKonlply === 2){
      props.checkSelectedDalle(false);
      setGrim(true); 
    }else{
      setLoading(true);
      addDalleTextContent(content);
      props.checkSelectedDalle(true);
    }
    setBtnType(isKonlply === 2 ? 1 : 2);
  }

  const bringGrim = () => {
    if(btnType === 2){
      setBringGrimWarning(true)
    }
    else {
      setModalTitle('달리를 가져오게 되면 기존 그림이 사라집니다.');
      setModalContent('달리에서 이미지를 가져올까요?');
      props.checkSelectedDalle(false);
      setBtnType(1);
      setGrim(true);  
      setGetDalleList([]);
    }  
  }

  // 달리 가져오기
  const bringDalleGrim = () => {
    if(content===''){
      setConfirmContents(true);
      return;
    }
    if (btnType === 1) {
      setBringGrimWarning(true)
    }else{
      setModalTitle('그림을 그리시게 되면 달리 그림이 사라집니다.');
      setModalContent('그림 그리시겠습니까?');
      props.checkSelectedDalle(true);
      setBtnType(2);
      if (getDalleList.length >= 4){
        setBringMoreDalleWarning(true);
      }else{
        setLoading(true);
        addDalleTextContent(content);  
      }
    }
  }

  useEffect(()=>{
    if(isDalleTextSuccess && dalleTaskId){
      sendDallePollingState(dalleTaskId);
    }
    if(isDalleTextError) {
      setTextSendingError(true);
    }
  },[isDalleTextSuccess, isDalleTextError]);

  useEffect(()=>{
    let intervalId: any;
    if(isDallePollingSuccess) {
      intervalId = setInterval(() => {
        sendDallePollingState(dalleTaskId);
      }, 8000);
      if (dalleState === 'SUCCESS' && dalleTaskId !== undefined) {
        clearInterval(intervalId);
        getDalleImg(dalleTaskId);
      }
    }
    return () => {
      clearInterval(intervalId);
    }
  },[isDallePollingSuccess, dalleTaskId, dalleState]);

  useEffect(()=>{    
    if(isGetDalleImgSuccess && dalleImg.length !== 0){
      setGetDalleList([...getDalleList, ...(dalleImg as string[])]);
      setLoading(false);
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
                <DW.Modebutton onClick={bringDalleGrim}>
                  Dall-E 가져오기
                </DW.Modebutton>
                <DW.Modebutton onClick={bringGrim}>
                  그림 그리기
                </DW.Modebutton>
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
      {loading && <KonlplyLoading />}
      {confirmWeather && <Modal onClick={()=>{}} icon='warning' version='no_btn' title="날씨를 선택해 주세요." content="" />}
      {confirmTitle && <Modal onClick={()=>{}} icon='warning' version='no_btn' title="제목을 입력해 주세요." content="" />}
      {confirmContents && <Modal onClick={()=>{}} icon='warning' version='no_btn' title="내용을 입력해 주세요." content="" />}
      {limitWordLength && <Modal onClick={()=>{}} icon='warning' version='no_btn' title="50글자 이하로 작성해 주세요." content="" />}
      {textSendingError && <Modal onClick={()=>{setTextSendingError(false)}} icon='warning' version='no_btn' title="텍스트 전송 실패." content="" />}
      {bringGrimWarning && <Modal onClick={()=>{resetImgList(btnType)}} icon='warning' version='two_btn' title={modalTitle} content={modalContent} />}
      {bringMoreDalleWarning && <Modal onClick={()=>{setLoading(true); setGetDalleList([]); setChoiceDalleImg(''); addDalleTextContent(content); return;}} icon='warning' version='two_btn' title="달리는 최대 4개까지 가능합니다. 기존 달리를 초기화하고 새로운 달리를 가져올까요?" content="" /> }
    </D.DiviContainer>
  );
}

export default forwardRef(DiaryContent2);