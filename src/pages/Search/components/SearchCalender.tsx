import {useState} from 'react';
import { format, addMonths, subMonths } from 'date-fns';
import * as DL from '../../../styles/diary/diarylist.style';
import * as DS from '../../../styles/diary/diarysearch.style';

interface RenderHeaderProps{
  currentMonth: Date;
  prevMonth: () => void;
  nextMonth: () => void;
}

const RenderHeader = ({ currentMonth, prevMonth, nextMonth }:RenderHeaderProps) => {
  return (
    <DL.HeaderContainer>
      <DL.HeaderYear>
        {format(currentMonth, 'yyyy')}
      </DL.HeaderYear>
      <DL.HeaderDate>
        <DL.ArrowBackIcon onClick={prevMonth} />
        <p>{format(currentMonth, 'M')}월</p>
        <DL.ArrowForwardIcon onClick={nextMonth} />
      </DL.HeaderDate>
    </DL.HeaderContainer>
  );
};

interface SearchCalenderProps{
  list: any[];
  search: undefined | string;
  getDiaryDetail: (data: any) => void; 
  getdiaryMonth: (date:string) => void;
}

function SearchCalender({list, search, getDiaryDetail, getdiaryMonth}:SearchCalenderProps){
  const [currentMonth, setCurrentMonth]=useState<Date>(new Date());
  const prevMonth = () =>{
    const date = subMonths(currentMonth, 1);
    const year = date.getFullYear();
    const month = date.getMonth()+1;
    setCurrentMonth(date);
    getdiaryMonth(year+'-'+month.toString().padStart(2, "0"));
  };
  const nextMonth = () =>{
    const date = addMonths(currentMonth,1);
    const year = date.getFullYear();
    const month = date.getMonth()+1;
    setCurrentMonth(date);
    getdiaryMonth(year+'-'+month.toString().padStart(2, "0"));
  }

  return(
    <DL.CalenderContainer>
      <RenderHeader currentMonth={currentMonth} prevMonth={prevMonth} nextMonth={nextMonth}></RenderHeader>
      <DS.SearchContainer>
        {list?.map((data:any, key:number)=> {
          const diaryDate = new Date(data.diary_date);
          const day = String(diaryDate.getDate()).padStart(2, '0');
          const weekdays = ["일", "월", "화", "수", "목", "금", "토"];
          const weekday = weekdays[diaryDate.getDay()]+'요일'; 
          return(
            <DS.SearchWrap key={key} onClick={()=>getDiaryDetail(data)}>
              <DS.SearchDate>
                <h2>{day}</h2>
                <div>{weekday}</div>
              </DS.SearchDate>
              <hr />
              <DS.SearchContentContainer>
                <DS.SearchTitleWrap>
                  <div>{data.emoji}</div>
                  {
                    data.title.includes(search) ? (
                      <p>
                        {data.title.split(search)[0]}
                        <span style={{color:'#EB8888'}}>{search}</span>
                        {data.title.split(search)[1]}
                      </p>  
                    ):(
                      <p>{data.title}</p>
                    )
                  }
                </DS.SearchTitleWrap>
                {
                  data.contents.includes(search) ? (
                    <DS.SearchContent>
                      {data.contents.split(search)[0]}
                      <span style={{color:'#EB8888'}}>{search}</span>
                      {data.contents.split(search)[1]}
                    </DS.SearchContent>
                  ):(
                    <DS.SearchContent>{data.contents}</DS.SearchContent>
                  )
                }
              </DS.SearchContentContainer>
            </DS.SearchWrap>
          )
        })}
      </DS.SearchContainer>
    </DL.CalenderContainer>
  )
}
export default SearchCalender;