import { useState } from 'react';
import api from '../../../apis/baseAxios'
import Swal, { SweetAlertResult } from 'sweetalert2';
import ResultManuscript from './ResultManuscript';
import * as D from '../../../styles/diary/diary.style';
import * as DL from '../../../styles/diary/diarylist.style';
import { ReactComponent as Sunny } from '../../../../public/images/sunny.svg';
import { ReactComponent as Cloud } from '../../../../public/images/cloud.svg';
import { ReactComponent as Rainy } from '../../../../public/images/rainy.svg';
import { ReactComponent as Snow } from '../../../../public/images/snow.svg';


interface DiaryListProps{
  id: number;
  title: string;
  weather: number;
  draw: string;
  contents: string;
  date: string;
  emoji: string;
}

type Props = SweetAlertResult<any>;

function DiaryList({id, title, weather, draw, contents, date, emoji}:DiaryListProps){
  const [shareMenu, setShareMenu] = useState<boolean>(false);
  
  const getDayOfWeek = (date:string) => {
    const week=['일', '월', '화', '수', '목', '금', '토'];
    const dayOfWeek = week[new Date(date).getDay()];
    return dayOfWeek;
  }
  
  let fulldate=date.split('-');
  let todayMonth=new Date(date).getMonth();  //월 구하기
  let todayDate=new Date(date).getDate();  //일 구하기
  let todayDay = getDayOfWeek(date);

  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true
  })

  const kakaoShare = () => {
    // window.Kakao.Share.sendDefault({
    //   objectType: 'feed',
    //   content: {
    //     title: title,
    //     description: contents,
    //     // 일기에서 그린 그림 url 주소 하고 싶어영
    //     imageUrl: draw,
    //     link: {
    //     // 도메인 주소 정해지면 그거 넣으면 될 것 같아여
    //       mobileWebUrl: 'http://localhost',
    //       webUrl: 'http://localhost',
    //     },
    //   },
    // });
  }

  const twitterShare = () => {
    const location = window.location.href;
    const url = encodeURIComponent(location);
    window.open(`https://twitter.com/intent/tweet?url=${url}&text=${title}`);
  }

  const urlShare = () => {
    const location = window.location.href;
    window.navigator.clipboard.writeText(location).then(() => {
      Toast.fire({
        icon: 'success',
        title: '복사 성공!'
      })
    })
  }

  const DeleteDiary = (id:number) => {
    Swal.fire({
      title: '정말 삭제하시겠습니까?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '네',
      cancelButtonText: '아니오'
    }).then((result: Props) => {
      console.log(result)
      if (result.isConfirmed) {
        Swal.fire({
          title: '삭제 성공!',
          icon: 'success',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'OK',
        }).then((result: Props) => {
          if (result.isConfirmed) {
            api.delete(`diaries/${id}/`).then((res) => {
              window.location.reload();
            }).catch((err) => {
              console.log(err)
            })
          }
        })
      }
    })
    
  }
  const Weather = () => {
    return(
      <>
        <Sunny fill={weather===1 ? '#FF0000' : '#969696'} className='weather' />
        <Cloud fill={weather===2 ? '#4E5D79' : '#969696'} className='weather' />
        <Rainy fill={weather===3 ? '#5A5A5A' : '#969696'} className='weather' />
        <Snow fill={weather===4 ? '#FFFAFA' : '#969696'} />
      </>
    )
  }

  const toggleshareMenu = () => {
    setShareMenu((shareMenu) => !shareMenu);
  }

  return(
    <D.DiviContainer>
      <D.DiaryContainer>
        <D.DateContainer>
          <D.DateContent>{todayMonth}월 {todayDate}일 {todayDay}요일</D.DateContent>
          <D.WeatherWrap>
            <Weather/>
          </D.WeatherWrap>
        </D.DateContainer>
        <D.TitleContainer>
          <D.Title>
            제목: 
            <D.Titlecontent>{title}</D.Titlecontent>
          </D.Title>
          <D.Emoji>{emoji}</D.Emoji>
        </D.TitleContainer>
        <D.Canvas>
          <img src={draw} alt="diarygrim" style={{ width: '500px', height: '290px' }} />
          <DL.ShareWrap className={shareMenu ? "show-menu" : "hide-menu"}>
            <DL.SNSImg onClick={kakaoShare} src='images/kakao.png' alt='none' />
            <DL.SNSImg onClick={twitterShare} src='images/twitter.png' alt='none' />
            <DL.SNSImg onClick={urlShare} src='images/url.png' alt='none' />
          </DL.ShareWrap>
          <D.ChoiceButtonContainer>
            <D.ButtonItem onClick={toggleshareMenu}><img src="images/share.svg" alt="공유" /></D.ButtonItem>
            <D.ButtonItem onClick={()=>DeleteDiary(id)}><img src="images/update.svg" alt="" /></D.ButtonItem>
          </D.ChoiceButtonContainer>
        </D.Canvas>
        <D.Content><ResultManuscript content={contents}/></D.Content>
      </D.DiaryContainer>
    
    </D.DiviContainer>
  )
}

export default DiaryList;