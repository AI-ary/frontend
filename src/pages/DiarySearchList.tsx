import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router';
import { Book2Container, WriteContainer } from './WriteGrim'
import BookShape2L from '../components/bookshape/BookShapeL';
import BookShape2R from '../components/bookshape/BookShapeR';
import Bookmark from '../components/bookshape/Bookmark';
import DiaryList from '../components/diarylist/DiaryList';
import { getSearchData } from '@/apis/searchDiary';

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

  return(
    <WriteContainer>
      <Book2Container style={{paddingBottom:'80px'}}> 
        <BookShape2L>
          <div style={{display:'flex', flexDirection:'column'}}>
            {searchList.map((data:any,key:number)=>{
              return(
                <div key={key}>
                  <span style={{margin:'10px'}}>{data.diary_date}</span>
                  <span style={{margin:'10px'}} onClick={()=>setDetail(data)}>{data.title}</span>
                  <span style={{margin:'10px'}}>{data.contents}</span>
                </div>
              )
            })}
          </div>
        </BookShape2L>
        <BookShape2R>
          {detail===undefined || detail.id===-1?'':
            <DiaryList key={detail.id} id={detail.id} title={detail.title} weather={detail.weather} draw={detail.drawing_url} contents={detail.contents} date={detail.diary_date} emoji={detail.emoji} />
          }
        </BookShape2R>
        <Bookmark />
      </Book2Container>
    </WriteContainer>
  )
}

export default DiarySearchList;