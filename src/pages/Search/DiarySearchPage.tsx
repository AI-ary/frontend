import {useState, useEffect} from 'react';
import { useParams } from 'react-router';
import { getSearchData } from '@/apis/searchDiary';
import OpenBookLeft from '../../components/bookshape/OpenBookLeft';
import OpenBookRight from '../../components/bookshape/OpenBookRight';
import Bookmark from '../../components/bookshape/Bookmark';
import DiaryList from '../DiaryList/components/DiaryList'
import * as C from '../../styles/bookshape/closedbook.style';
import * as O from '../../styles/bookshape/opendbook.style';
import * as DL from '../../styles/diary/diarylist.style';
import SearchCalender from './components/SearchCalender';

function DiarySearchList(){ 
  const [searchList, setSearchList] = useState<any>([]);
  const [detail, setDetail]=useState({
    id:-1,
    title:'',
    weather:-1,
    drawing_url:'',
    contents:'',
    diary_date:'',
    emoji:''
  });
  const user = sessionStorage.getItem('id') || ''; //user id받아오기
  const param = useParams();
  const search = param.word;

  const {isLoading, isSuccess, data} = getSearchData({search, user});

  useEffect(()=>{
    if(isSuccess){
      setSearchList(data);
      setDetail(data[0]);
    }
  },[isSuccess, isLoading, data]);

  const showDiaryDetail = (data:any) => {
    setDetail(data);
  }

  return(
    <C.Container>
      <O.BookContainer style={{marginBottom: '100px'}}> 
        <OpenBookLeft>
          <SearchCalender list={searchList} search={search} getDiaryDetail={showDiaryDetail}/>
        </OpenBookLeft>
        <OpenBookRight>
          {detail===undefined || detail.id===-1?'':
            <DiaryList key={detail.id} id={detail.id} title={detail.title} weather={detail.weather} draw={detail.drawing_url} contents={detail.contents} date={detail.diary_date} emoji={detail.emoji} />
          }
        </OpenBookRight>
        <Bookmark />
      </O.BookContainer>
    </C.Container>
  )
}

export default DiarySearchList;