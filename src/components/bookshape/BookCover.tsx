import React from 'react';
import styled from 'styled-components';
import Bookmark from './Bookmark';
import LogoutBtn from '../../pages/Auth/components/Logout';
import isLogin from '../../pages/Auth/components/IsLogin';
import './Right.css'
import { DiviContainer } from '../../pages/WriteDiary/components/DiaryContent';
import DiaryList from '../../pages/DIaryList/components/DiaryList';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import { BsArrowRight  } from 'react-icons/bs';
import { useStore } from '../../store/store';



const AllControl = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`  

const Left = styled.div`
  background-color: #F0DB6D;
  float: left;
  width: 55px;
  height: 760px;
  margin-left: 18px;
  border-top-left-radius: 20px;
  border-bottom-left-radius: 20px;
  box-shadow:10px 9px 10px 0 #676262;`

const Year = styled.div`
  display:flex;
  justify-content:space-between;
  border-bottom: solid 2px black;
  font-size: 30px;
  margin: 35px;`

function BookCover({ children } : React.PropsWithChildren) {
  let now = new Date();
  let date = now.toLocaleDateString().split('.');
  let year = date[0];
  let month = date[1].trim();
  let day = date[2].trim();
  return (
    <AllControl className='slide'>
      <Left/>
      <div className  ='flip'>
        <Year>
          {year}
          {/* {isLogin() ? <LogoutBtn/> : ''} */}
          <LogoutBtn/>
        </Year>
        {children}
      </div>
      <div className='shapeR'>
        <DiviContainer style={{zIndex: '0'}}>
         <div style={{fontSize:'2.5rem', fontFamily:'KyoboHand', textAlign:'center'}}>
            <img src="images/write.PNG"  style={{width: '30%', margin:"0 auto"}} alt="list"/>
            <div style={{display:'flex', flexDirection:'row', justifyContent:'center', marginBottom:'5px'}}><p style={{width:'17rem', margin:'0', color:'orange'}}>{year}년 {month}월 {day}일</p>의</div>
                하루를 기록해볼까요?
            <Link to='/write' className="listLink">
                일기 쓰러 가기<BsArrowRight size="2rem" />
            </Link>
          </div>
        </DiviContainer>
      </div>
      <Bookmark/>
    </AllControl>
  );
}

export default BookCover;