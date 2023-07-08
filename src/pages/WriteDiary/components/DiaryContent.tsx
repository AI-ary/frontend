import { useState, useRef } from 'react';
import Manuscript from './Manuscript';
import Emoji from './Emoji';
import { BsBrightnessHighFill, BsFillCloudFill, BsFillCloudSnowFill, BsFillCloudRainFill } from 'react-icons/bs';
import { useLocation, useNavigate } from 'react-router-dom';
import Drawing from './Drawing';
import { useStore } from '../../../store/store';
import api from '../../../apis/axios';
import { format } from 'date-fns';
import Swal from 'sweetalert2';
import * as S from '../../../styles/diary/diary.style';

type DiaryContentProps = {
  getLoading: (load: boolean) => void;
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
  const variable = useRef<RefObject>({
    isDoubleClick: false
  });  //더블 클릭 방지 변수
  const date = location.state?.date;
  let year = date.getFullYear(); //연도 구하기
  let todayMonth = date.getMonth() + 1; //월 구하기
  let todayDate = date.getDate(); //일 구하기

  //이모지 받아오기
  const getEmoji = (x:string) => {
    setEmoji(x);
  };

  /**
   * 캔버스 이미지(base64)를 다시 png로 변환하기
   */

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
  const grimDiary = async () => {
    let form = new FormData();
    form.append('user_id', user);
    form.append('title', title);
    form.append('weather', String(weather));
    form.append('emoji', emoji);
    form.append('contents', content);
    form.append('diary_date', format(date, 'yyyy-MM-dd'));
    console.log(format(date, 'yyyy-MM-dd'));
    
    // 더블 클릭 방지 로직
    if(variable.current.isDoubleClick){
      return;
    }
    variable.current.isDoubleClick = true;
    await api
      .post('diaries/', form, {
        headers: { 'Content-Type': 'multipart/form-data', },
      })
      .then(function (response) {
        console.log(response.data)
        drawingUrl();
        
      })
      .catch(function (error) {
        if (error.response.data.title) {
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: '제목을 입력해 주세요.',
            showConfirmButton: false,
            timer: 2000,
          });
        } else if (error.response.data.contents) {
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: '내용을 입력해 주세요.',
            showConfirmButton: false,
            timer: 2000,
          });
        } else if (error.response.data.weather) {
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: '날씨를 선택해 주세요.',
            showConfirmButton: false,
            timer: 2000,
          });
        }
      });
  };

  const drawingUrl = async () => {
    let form = new FormData();
    form.append('user_id', user);
    form.append('diary_date', format(date, 'yyyy-MM-dd'));
    form.append('file', file);
    await api
      .post('images/upload', form, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      .then(function (response) {
        console.log(response.data)
        setChoiceImg([]);
        setGetGrimList([])
        navigate('/list');
        variable.current.isDoubleClick=false;
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  
  //AI키워드 그림 가져오기 버튼
  const bringGrim = async () => {
    props.getLoading(true);
    setGetGrimList([]);
    let form = new FormData();
    form.append('user_id', user);
    form.append('diary_date', format(date, 'yyyy-MM-dd'));
    form.append('contents', content);
    await api.post('text/', form, {
      headers: {
        'Content-Type': 'multipart/form-data',},
    })
      .then((res) => {
        api.get(`results?diary_date=${format(date, 'yyyy-MM-dd')}&&user_id=${user}`)
          .then(function (res) {
            if (res.data.result.length === 0) {
              Swal.fire({
                position: 'center',
                icon: 'warning',
                title: '키워드에 맞는 이미지가 없습니다.',
                showConfirmButton: false,
                timer: 2000
              })
              props.getLoading(false);
            } else {
              setGetGrimList(res.data);
              props.getLoading(false);
            }
          }).catch(function (error) {
            props.getLoading(false);
            if (error.response.data.ERROR === 'FAIL') {
              Swal.fire({
                position: 'center',
                icon: 'warning',
                title: '키워드에 맞는 이미지가 없습니다.',
                showConfirmButton: false,
                timer: 2000
              })
            }
          })
      }).catch((error) => {
        console.log(error)
      });
  };
  

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
    return <S.WeatherRadioBtn type='radio' id={mood} checked={weather === num} onChange={() => weatherChange(num)} />;
  }

  return (
    <S.DiviContainer>
      <S.DateContainer>
        <S.Dateline>
          <S.Datetitle>날짜</S.Datetitle>
          <S.DateContent>
            {year}.{todayMonth}.{todayDate}
          </S.DateContent>
          <S.Weathercontainer style={{ marginTop: '5px' }}>
            <WeatherBtn mood='sunny' num={1} />
            <label htmlFor='sunny'>{weather === 1 ? <BsBrightnessHighFill size='29' color='red' /> : <BsBrightnessHighFill size='27' color='#8e8d8d' />}</label>
            <WeatherBtn mood={'cloudy'} num={2} />
            <label htmlFor='cloudy'>
              {weather === 2 ? <BsFillCloudFill size='29' color='rgb(36 75 147)' /> : <BsFillCloudFill size='28' color='#8e8d8d' />}
            </label>
            <WeatherBtn mood={'rainy'} num={3} />
            <label htmlFor='rainy'>
              {weather === 3 ? (
                <BsFillCloudRainFill size='28' style={{ paddingTop: '1.5px' }} color='rgb(76 76 76)' />
              ) : (
                <BsFillCloudRainFill size='26.5' style={{ paddingTop: '1.5px' }} color='#8e8d8d' />
              )}
            </label>
            <WeatherBtn mood={'snow'} num={4} />
            <label htmlFor='snow'>
              {weather === 4 ? (
                <BsFillCloudSnowFill size='28' style={{ paddingTop: '2px' }} color='#FFFAFA' />
              ) : (
                <BsFillCloudSnowFill size='26' style={{ paddingTop: '2px' }} color='#8e8d8d' />
              )}
            </label>
          </S.Weathercontainer>
        </S.Dateline>
      </S.DateContainer>
      <S.TitleContainer>
        <S.Title>제목: </S.Title>
        <S.Titlecontent>
          <input type='text' onChange={onChange} value={title} />
        </S.Titlecontent>
        <Emoji getEmoji={getEmoji} />
      </S.TitleContainer>
      <S.Canvas>
        <Drawing grim={grim} />
      </S.Canvas>
      <S.ButtonContainer>
        <S.Modebutton style={{ width: '100px' }} onClick={bringGrim}>
          그림가져오기
        </S.Modebutton>
        <S.Modebutton style={{ width: '80px' }} onClick={clickedGrim}>
          {grim ? '그림그리기' : '스탑'}
        </S.Modebutton>
        <S.Savebutton
          onClick={grimDiary}>
          저장하기
        </S.Savebutton>
      </S.ButtonContainer>
      <S.Content>
        <Manuscript setContent={setContent} />
      </S.Content>
    </S.DiviContainer>
  );
}

export default DiaryContent;