import {useState, useEffect} from 'react';
import { useParams } from 'react-router';
import { getSearchData } from '@/apis/searchDiary';
import OpenBookLeft from '@/components/bookshape/OpenBookLeft';
import OpenBookRight from '@/components/bookshape/OpenBookRight';
import Bookmark from '@/components/bookshape/Bookmark';
import DiaryList from '@/pages/DiaryList/components/DiaryList'
import * as C from '@/styles/bookshape/closedbook.style';
import * as O from '@/styles/bookshape/opendbook.style';
import SearchCalender from './components/SearchCalender';
import Modal from '@/components/Modal';

function DiarySearchList(){ 
  const [searchList, setSearchList] = useState<any>([]);
  const [hasSearchContent, setHasSearchContent] = useState<boolean>(false);  // 검색 내용에 맞는 일기가 있는지 없는지
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth()+1;
  const [date, setDate]=useState<string>(year+'-'+month.toString().padStart(2, "0"));
  const [detail, setDetail]=useState({
    diary_id:-1,
    title:'',
    weather:'',
    drawing_url:'',
    contents:'',
    diary_date:'',
    emoji:''
  });
  const param = useParams();
  const keyword = param.word;

  const getSearchDiaryListDate = (date:string) => {
    setDate(date);
  }

  const {isLoading, isSuccess, data} = getSearchData({date, keyword});

  useEffect(()=>{
    if(isSuccess){
      if(data.length !== 0){
        setSearchList(data);
        setDetail(data[0]);
      }else{
        setHasSearchContent(true);
        setSearchList([]);
        setDetail({
          diary_id:-1,
          title:'',
          weather:'',
          drawing_url:'',
          contents:'',
          diary_date:'',
          emoji:''
        });
      }

    }
  },[isSuccess, isLoading, data]);

  const showDiaryDetail = (data:any) => {
    setDetail(data);
  }

  return(
    <C.Container>
      <O.BookContainer style={{marginBottom: '100px'}}> 
        <OpenBookLeft>
          <SearchCalender list={searchList} search={keyword} getDiaryDetail={showDiaryDetail} getdiaryMonth={getSearchDiaryListDate}/>
        </OpenBookLeft>
        <OpenBookRight>
          {detail===undefined || detail.diary_id===-1?'':
            <DiaryList key={detail.diary_id} data={detail} />
          }
        </OpenBookRight>
        <Bookmark />
      </O.BookContainer>
      {hasSearchContent && <Modal onClick={()=>{setHasSearchContent(false)}} icon='warning' version='one_btn' title="해당 달에 찾으신 내용은 없습니다." content="" />}
    </C.Container>
  )
}

export default DiarySearchList;