import { Button, makeStyles } from '@material-ui/core';
import ResultManuscript from './ResultManuscript';
import { BsBrightnessHighFill, BsFillCloudFill ,BsFillCloudSnowFill, BsFillCloudRainFill } from 'react-icons/bs';
import * as S from '../../../styles/diary/diary.style';
import api from '../../../apis/axios'
import styled from 'styled-components';
import Swal, { SweetAlertResult } from 'sweetalert2';

const useStyles = makeStyles(() => ({
  customHoverFocus: {
    '&:hover, &.Mui-focusVisible': { backgroundColor: 'black', color: 'white' },
  },
}));

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
  let fulldate=date.split('-');
  let year=fulldate[0];  //연도 구하기
  let todayMonth=fulldate[1];  //월 구하기
  let todayDate=fulldate[2];  //일 구하기

  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true
  })
  const classes = useStyles();

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
  function Weather() {
    return(
      <>
        <BsBrightnessHighFill size="27" color={weather===1 ? 'red' : 'grey'} />
        <BsFillCloudFill size="27" color={weather===2 ? '#4E5D79' : 'grey'} />
        <BsFillCloudRainFill size="26" color={weather===3 ? '#5A5A5A' : 'grey'} style={{paddingTop: '1.5px'}} />
        <BsFillCloudSnowFill size="25" color={weather===4 ? '#FFFAFA' : 'grey'} style={{paddingTop: '2px'}}/>
      </>
    )
  }

  return(
    <S.DiviContainer>
      <S.DateContainer>
        <S.Dateline>
          <S.Datetitle>날짜</S.Datetitle>
          <S.DateContent style={{width: '9rem', fontSize:'1.5rem'}}>{year}.{todayMonth}.{todayDate}</S.DateContent>
          <S.Weathercontainer>
            <Weather/>
          </S.Weathercontainer>
        </S.Dateline>
      </S.DateContainer>
      <S.TitleContainer>
        <S.Title>제목:</S.Title>
        <S.Titlecontent style={{fontSize: '1.5rem'}}>{title}</S.Titlecontent>
        <div style={{width:'1em', fontSize:'1.8em',marginLeft: '460px'}}>{emoji}</div>
      </S.TitleContainer>
      <S.Canvas><img src={draw} alt="diarygrim" style={{ width: '500px', height: '290px' }} /></S.Canvas>
      <div>
        <S.ChoiceButtonContainer style={{height: '25px' ,marginTop:'2%', marginLeft:'2.2%'}}>
          <Button onClick={()=>DeleteDiary(id)}>삭제</Button>
          <SNSImg onClick={kakaoShare} src='/images/kakao.png' alt='none' />
          <SNSImg onClick={twitterShare} src='/images/twitter.png' alt='none' />
          <SNSImg onClick={urlShare} src='/images/url.png' alt='none' />
        </S.ChoiceButtonContainer>
      </div>
      <S.Content><ResultManuscript content={contents}/></S.Content>
    </S.DiviContainer>
  )
}

export default DiaryList;

const SNSImg = styled.img`
  height: 40px;
  margin: 0px 10px 0px 10px;
  &:hover {
    cursor: pointer;
  }
  `