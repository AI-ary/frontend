import { useState, useEffect } from 'react';
import { useStore } from '../../store/store';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import { getDiaryListData } from '@/apis/diaryList';
import BookShape2L from '../../components/bookshape/BookShapeL';
import BookShape2R from '../../components/bookshape/BookShapeR';
import Bookmark from '../../components/bookshape/Bookmark';
import Calender from './components/Calender';
import DiaryList from './components/DiaryList';
import { DiviContainer } from '../WriteDiary/components/DiaryContent';
import Loading from '../../components/Loading';
import { BsArrowRight  } from 'react-icons/bs';
import * as O from '../../styles/bookshape/opendbook.style';
import * as C from '../../styles/bookshape/closedbook.style';

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
        <BookShape2L>
          {/* <Calender list={list} exist={exist} /> */}
        </BookShape2L>
        <BookShape2R>
          {/* {list.filter(x=>new Date(x.diary_date).toDateString()===choiceDate.toDateString())
            // eslint-disable-next-line no-loop-func
            .map((data,index)=>{
              return <DiaryList key={index} id={data.id} title={data.title} weather={data.weather} draw={data.drawing_url} contents={data.contents} date={data.diary_date} emoji={data.emoji} />})}
          {exist.includes(format(choiceDate, 'yyyy-MM-dd'))?'':(<DiviContainer style={{zIndex: '0'}}>
            <div style={{fontSize:'2.5rem', fontFamily:'KyoboHand', textAlign:'center'}}>
              <img src="images/write.PNG"  style={{width: '30%', margin:"0 auto"}} alt="list"/>
              <div style={{display:'flex', flexDirection:'row', justifyContent:'center', marginBottom:'5px'}}><p style={{width:'17rem', margin:'0', color:'orange'}}>{choiceDate.getFullYear()}년 {format(choiceDate, 'M')}월 {choiceDate.getDate()}일</p>의</div>
                하루를 기록해볼까요?
              <Link to='/write' state={{date:choiceDate}} className="listLink">
                    일기 쓰러 가기<BsArrowRight size="2rem" />
              </Link>
            </div>
          </DiviContainer>)} */}
        </BookShape2R>
        <Bookmark />
      </O.OpenBookContainer>
    </C.Container>
  )
}

export default GrimList;