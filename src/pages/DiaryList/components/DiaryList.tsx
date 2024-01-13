import { useEffect, useState } from 'react';
import { deleteDiaryData } from '@/apis/diaryList';
import ResultManuscript from './ResultManuscript';
import * as D from '../../../styles/diary/diary.style';
import * as DL from '../../../styles/diary/diarylist.style';
import { useStore } from '@/store/store';
import Modal from '@/components/Modal';

interface DiaryListProps {
  data: {
    title: string;
    diary_id: number;
    weather: string;
    contents: string;
    diary_date: string;
    emoji: string;
    drawing_url: string;
  };
}

function DiaryList({ data }: DiaryListProps) {
  const [shareMenu, setShareMenu] = useState<boolean>(false);
  const [urlCopy, setUrlCopy] = useState<boolean>(false);
  const [deleteSuccess, setDeleteSuccess] = useState<boolean>(false);
  const { confirmDelete, setConfirmDelete } = useStore();

  const getDayOfWeek = (date: string) => {
    const week = ['일', '월', '화', '수', '목', '금', '토'];
    const dayOfWeek = week[new Date(date).getDay()];
    return dayOfWeek;
  };

  let todayMonth = new Date(data.diary_date).getMonth() + 1; //월 구하기
  let todayDate = new Date(data.diary_date).getDate(); //일 구하기
  let todayDay = getDayOfWeek(data.diary_date);

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
  };

  const twitterShare = () => {
    const location = window.location.href;
    const url = encodeURIComponent(location);
    window.open(
      `https://twitter.com/intent/tweet?url=${url}&text=${data.title}`
    );
  };

  const urlShare = () => {
    const location = window.location.href;
    window.navigator.clipboard.writeText(location).then(() => {
      setUrlCopy(true);
    });
  };

  const { isDeleteLoading, result, isDeleteSuccess, isError, deleteDiaryList } =
    deleteDiaryData();

  const confirmDeleteDiary = () => {
    deleteDiaryList(data.diary_id);
    setConfirmDelete(false);
  };

  const deleteDiarySuccess = () => {
    location.reload();
    setDeleteSuccess(false);
  };

  useEffect(() => {
    if (isDeleteSuccess && result.code === 'D002') {
      setDeleteSuccess(true);
    } else if (isError) {
      alert('삭제 실패하였습니다.');
    }
  }, [isDeleteSuccess, isError]);

  const Weather = () => {
    return (
      <>
        <D.StyledSunny
          fill={data.weather === 'SUNNY' ? '#FF0000' : '#969696'}
          className='weather'
        />
        <D.StyledCloudy
          fill={data.weather === 'CLOUDY' ? '#4E5D79' : '#969696'}
          className='weather'
        />
        <D.StyledRainy
          fill={data.weather === 'RAIN' ? '#5A5A5A' : '#969696'}
          className='weather'
        />
        <D.StyledSnow fill={data.weather === 'SNOW' ? '#98ffed' : '#969696'} />
      </>
    );
  };

  const toggleshareMenu = () => {
    setShareMenu((shareMenu) => !shareMenu);
  };

  return (
    <D.DiviContainer>
      <D.DiaryContainer>
        <D.DateContainer>
          <D.DateContent>
            {todayMonth}월 {todayDate}일 {todayDay}요일
          </D.DateContent>
          <D.WeatherWrap>
            <Weather />
          </D.WeatherWrap>
        </D.DateContainer>
        <D.TitleContainer>
          <D.Title>
            제목:
            <D.Titlecontent>{data.title}</D.Titlecontent>
          </D.Title>
          <D.Emoji>{data.emoji}</D.Emoji>
        </D.TitleContainer>
        <D.Canvas>
          <img src={data.drawing_url} alt='diarygrim' />
          {/* <DL.ShareWrap className={shareMenu ? 'show-menu' : 'hide-menu'}>
            <DL.SNSImg onClick={kakaoShare} src='/images/kakao.png' alt='none' />
            <DL.SNSImg onClick={twitterShare} src='/images/twitter.png' alt='none' />
            <DL.SNSImg onClick={urlShare} src='/images/url.png' alt='none' />
          </DL.ShareWrap> */}
          <D.ChoiceButtonContainer>
            {/* <D.ButtonItem onClick={toggleshareMenu}><D.StyledShare /></D.ButtonItem> */}
            <D.ButtonItem onClick={() => setConfirmDelete(true)}>
              <D.StyledDelete />
            </D.ButtonItem>
          </D.ChoiceButtonContainer>
        </D.Canvas>
        <D.Content>
          <ResultManuscript content={data.contents} />
        </D.Content>
      </D.DiaryContainer>
      {confirmDelete && (
        <Modal
          onClick={confirmDeleteDiary}
          icon='warning'
          version='two_btn'
          title='정말 삭제하시겠습니까?'
          content=''
        />
      )}
      {deleteSuccess && (
        <Modal
          onClick={deleteDiarySuccess}
          icon='success'
          version='no_btn'
          title='삭제 성공!'
          content=''
        />
      )}
      {urlCopy && (
        <Modal
          onClick={() => setUrlCopy(false)}
          icon='success'
          version='no_btn'
          title='복사 성공!'
          content=''
        />
      )}
    </D.DiviContainer>
  );
}

export default DiaryList;
