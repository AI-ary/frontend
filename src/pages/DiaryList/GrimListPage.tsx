import { useState, useEffect } from 'react';
import { useStore } from '../../store/store';
import { format } from 'date-fns';
import { getDiaryListData } from '@/apis/diaryList';
import OpenBookLeft from '../../components/bookshape/OpenBookLeft';
import OpenBookRight from '../../components/bookshape/OpenBookRight';
import Bookmark from '../../components/bookshape/Bookmark';
import Calender from './components/Calender';
import DiaryList from './components/DiaryList';
import Loading from '../../components/Loading';
import * as O from '../../styles/bookshape/opendbook.style';
import * as C from '../../styles/bookshape/closedbook.style';
import * as D from '../../styles/diary/diary.style';
import * as DL from '../../styles/diary/diarylist.style';

interface ListContent{
  user_id:number|undefined;
  diary_date:string|undefined;
}

function GrimList() {
  const [add, setAdd]=useState<ListContent[]>([]);
  const {choiceDate}=useStore();
  const exist:any[]=[];
  const list:any[]=[];
  const user = sessionStorage.getItem('id') || ''; //user id받아오기

  //일기 리스트 가져오기(전체)
  const {isLoading, isSuccess, data} = getDiaryListData();

  useEffect(()=>{
    if(isSuccess){
      setAdd(data);
    }
  },[isSuccess, isLoading, data]);

  for(let i=0;i<add.length;i++){
    if(add[i].user_id===parseInt(user)){
      exist.push(add[i].diary_date);
      list.push(add[i]);
    }
  }
  return(
    <C.Container>
      <O.OpenBookContainer > 
      {isLoading ? <Loading /> : ''}
        <OpenBookLeft>
          <Calender list={list} exist={exist} />
        </OpenBookLeft>
        <OpenBookRight>
          {list.filter(x=>new Date(x.diary_date).toDateString()===choiceDate.toDateString())
            .map((data,index)=>{
              return <DiaryList key={index} id={data.id} title={data.title} weather={data.weather} draw={data.drawing_url} contents={data.contents} date={data.diary_date} emoji={data.emoji} />})}
          {exist.includes(format(choiceDate, 'yyyy-MM-dd'))?'':(
          <D.DiviContainer style={{zIndex: '0'}}>
            <DL.NonDiaryContainer>
              <img src="images/write.svg" alt="list"/>
              <div>
                <span>{choiceDate.getFullYear()}년 {format(choiceDate, 'M')}월 {choiceDate.getDate()}일</span>
                의<br />하루를 기록해볼까요?
              </div>
              <DL.GotoDiaryWrite to='/write' state={{date:choiceDate}} className='.link'>
                일기 쓰러 가기
              </DL.GotoDiaryWrite>
            </DL.NonDiaryContainer>
          </D.DiviContainer>)}
        </OpenBookRight>
        <Bookmark />
      </O.OpenBookContainer>
    </C.Container>
  )
}

export default GrimList;