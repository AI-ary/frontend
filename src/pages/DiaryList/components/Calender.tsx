import {useState} from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../../../store/store';
import { format, addMonths, subMonths, startOfMonth, endOfMonth, 
  startOfWeek, endOfWeek, isSameMonth, isSameDay, addDays } from 'date-fns';
import * as DL from '../../../styles/diary/diarylist.style';

//header 컴포넌트(월 이동)

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

//Days(요일) 캄포넌트
const RenderDays = () =>{
  const days=[];
  const date=['SUN', 'MON', 'THU', 'WED', 'THU', 'FRI', 'SAT'];

  for(let i=0; i<7; i++){
    days.push(
      <p key={i}>
        {date[i]}
      </p>
    )
  }
  return <DL.WeekWrap>{days}</DL.WeekWrap>
}

interface RenderCellsProps {
  currentMonth: any;
  today: Date;
  list: any[];
  exist: any[];
  selectedDate: Date;
  onDateClick: (cloneDay:Date) => void;
}

//Body(Cells) 컴포넌트(날짜(일))
const RenderCells = ({currentMonth, today, list, exist, selectedDate, onDateClick}:RenderCellsProps)=>{
  const monthStart=startOfMonth(currentMonth);
  const monthEnd=endOfMonth(monthStart);
  const startDate=startOfWeek(monthStart);
  const endDate=endOfWeek(monthEnd);
  const [clickDate, setClickDate]=useState<string>(format(selectedDate, 'yyyy-MM-dd'));  //일기 추가 상태
  const [hoveredDate, setHoveredDate]=useState<string | null>(null);
  const {setChoicedDate}=useStore();  //페이지 이동 시 선택 날짜 초기화
  const rows:any=[];
  let days:any=[];
  let day:any=startDate;
  let formattedDate:string = '';

  const pageMove = () =>{
    setChoicedDate(new Date());
  }

  while(day<=endDate){
    for (let i=0; i<7; i++){  
      formattedDate = format(day, 'd');
      const cloneDay:Date=day;
      days.push(
        <DL.DaysCol className={`cell ${
          !isSameMonth(day, monthStart)
            ? 'not-valid'
            : isSameDay(day, selectedDate)
              ? 'selected'
              : isSameDay(day, today)
                ? 'today'
                : format(currentMonth, 'M') !== format(day, 'M')
                  ?'not-valid'
                  :'valid'
        }`}
        key={day}
        onClick={()=>{
          onDateClick(cloneDay);
          setClickDate(format(cloneDay, 'yyyy-MM-dd'));
        }}
        onMouseEnter={() => {
          setHoveredDate(format(cloneDay, 'yyyy-MM-dd'));
        }}
        onMouseLeave={() => {
          setHoveredDate(null);
        }}
        >
          <>
            {formattedDate}
            <DL.IconWrap>
              {list.filter(x=>new Date(x.diary_date).toDateString()===cloneDay.toDateString())
                .map((data,index)=>{
                  return <DL.ListEmoji key={index}>{data.emoji}</DL.ListEmoji>})}
            </DL.IconWrap>
          </>
          {exist.includes(format(cloneDay, 'yyyy-MM-dd'))?'':
          (<DL.IconWrap> 
              <Link to='/write' state={{date:day}}>
                <div>
                  <DL.PlusCircle
                    className={`${format(cloneDay, 'yyyy-MM-dd') === clickDate || format(cloneDay, 'yyyy-MM-dd') === hoveredDate ? 'hover-close' : 'hide'}`} />
                </div>
              </Link>
          </DL.IconWrap>)
          }
        </DL.DaysCol>
      );
      day=addDays(day, 1);
    }
    rows.push(
      <DL.DaysRow key={day}>
        {days}
      </DL.DaysRow>
    );
    days=[];
  }
  return <DL.DaysWrap>{rows}</DL.DaysWrap>
}

interface CalenderProps{
  list: any[];
  exist: any[];
}

function Calender({list, exist}:CalenderProps){
  const [currentMonth, setCurrentMonth]=useState<Date>(new Date());
  const {choiceDate, setChoicedDate}=useStore();
  const [selectedDate, setSelectedDate]=useState<Date>(choiceDate);
  const prevMonth = () =>{
    setCurrentMonth(subMonths(currentMonth, 1));
  };
  const today=new Date();
  const nextMonth = () =>{
    setCurrentMonth(addMonths(currentMonth,1));
  }
  const onDateClick = (day:any) =>{
    setSelectedDate(day);
    setChoicedDate(day);
  }
  return(
    <DL.CalenderContainer>
      <RenderHeader currentMonth={currentMonth} prevMonth={prevMonth} nextMonth={nextMonth}></RenderHeader>
      <RenderDays/>
      <RenderCells currentMonth={currentMonth} today={today} list={list} exist={exist} selectedDate={selectedDate} onDateClick={onDateClick}></RenderCells>
    </DL.CalenderContainer>
  )
}

export default Calender;
