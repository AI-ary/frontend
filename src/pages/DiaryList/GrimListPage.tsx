import { useState, useEffect } from 'react';
import { useStore } from '../../store/store';
import { format } from 'date-fns';
import { getDiaryListData } from '@/apis/diaryList';
import OpenBookLeft from '../../components/bookshape/OpenBookLeft';
import OpenBookRight from '../../components/bookshape/OpenBookRight';
import Bookmark from '../../components/bookshape/Bookmark';
import Calender from './components/Calender';
import DiaryList from './components/DiaryList';
import * as O from '../../styles/bookshape/opendbook.style';
import * as C from '../../styles/bookshape/closedbook.style';
import * as D from '../../styles/diary/diary.style';
import * as DL from '../../styles/diary/diarylist.style';

function GrimList() {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth()+1;
  const [diaryDate, setDiaryDate]=useState<string>(year+'-'+month.toString().padStart(2, "0"));
  const { choiceDate } = useStore();
  const [diaryList, setDiaryList] = useState<any[]>([]);
  const [existDate, setExistDate] = useState<any[]>([]);

  const getDiaryListDate = (date:string) => {
    setDiaryDate(date);
  }

  const {isSuccess, data} = getDiaryListData(diaryDate);

  useEffect(()=>{
    if(isSuccess){
      setDiaryList(data.diary_infos);
    }
  },[isSuccess, data]);

  useEffect(()=>{
    if (diaryList.length > 0) {
      setExistDate([...existDate, ...diaryList.map(data => data.diary_date)]);
    }
  },[diaryList]);

  return(
    <C.Container>
      <O.BookContainer style={{marginBottom: '100px'}}> 
        <OpenBookLeft withClose={true}>
          <Calender list={diaryList} exist={existDate} getdiaryMonth={getDiaryListDate}/>
        </OpenBookLeft>
        <div style={{display:'flex',flexDirection:'row',height:'100%'}} className='will-move div-slide'>
          <OpenBookRight>
            {diaryList && diaryList?.filter(x=>new Date(x.diary_date).toDateString()===choiceDate.toDateString())
              .map((data,index)=>{
                return <DiaryList key={index} data={data} />})}
            {existDate.includes(format(choiceDate, 'yyyy-MM-dd'))?'':(
              <D.DiviContainer style={{zIndex: '0'}}>
                <DL.NonDiaryContainer>
                  <img src="images/write.svg" alt="list"/>
                  <div>
                    <span>{choiceDate.getFullYear()}년 {format(choiceDate, 'M')}월 {choiceDate.getDate()}일</span>
                    의<br />하루를 기록해볼까요?
                  </div>
                  <DL.GotoDiaryWrite to='/write' state={{date:choiceDate}}>
                    일기 쓰러 가기
                  </DL.GotoDiaryWrite>
                </DL.NonDiaryContainer>
              </D.DiviContainer>)}
          </OpenBookRight>
          <Bookmark />
        </div>
      </O.BookContainer>
    </C.Container>
  )
}

export default GrimList;