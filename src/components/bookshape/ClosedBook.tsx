import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../../store/store';
import Bookmark from './Bookmark';
import OpenBookRight from '../../components/bookshape/OpenBookRight';
import * as S from '../../styles/bookshape/closedbook.style'
import * as B from '../../styles/bookshape/opendbook.style'
import * as D from '../../styles/diary/diary.style';
import * as DL from '../../styles/diary/diarylist.style';
import { RiArrowLeftSLine } from 'react-icons/ri';
import { ThemeType, useThemeContext } from '../../App';
import baseAxios from '@/apis/baseAxios';

const ClosedBook = ({ children }: React.PropsWithChildren) => {
  const {changeThemeType} =useThemeContext()
  const [themeMenu, setThemeMenu] = useState<boolean>(false);
  const [currentTheme,setCurrentTheme] = useState<string | null>(null)
  const path = window.location.pathname;
  const navigate = useNavigate();
  const {choiceDate}=useStore();
  const year = choiceDate.getFullYear()
  const month = choiceDate.getMonth() + 1
  const day = choiceDate.getDate()

  const handleThemeChange = (themeType:ThemeType) => {
    changeThemeType(themeType);
    setCurrentTheme(themeType)
  }

  const changeTheme = () => {
    if (sessionStorage.getItem('nickname') && currentTheme) {
      let sendData: string | null = null;
      switch (currentTheme) {
      case 'blueTheme': {
        sendData = 'BLUE'
        break;
      }
      case 'rainbowTheme': {
        sendData = 'RAINBOW'
        break;
      }
      case 'originTheme': {
        sendData = 'ORIGINAL'
        break;
      }
      }
      baseAxios.put('users/theme', {
        'theme' : sendData
      }).then(() => {
        if (sendData) {
          sessionStorage.setItem('theme', sendData);
        }
      }).catch((err) => {
        console.log(err)
      })
    }
    setThemeMenu(false)
    setCurrentTheme(null)
  }

  return(
    <S.Container className='slide'>
      <S.ThemeContainer>
        {!themeMenu? <S.StyledHiddenPalette onClick={()=> setThemeMenu(true)} /> : currentTheme ? <S.StyledCheckIcon onClick={changeTheme} /> : <S.StyledShowPalette onClick={()=>setThemeMenu(false)} /> }
        <S.ToggleTheme className={themeMenu ? 'show-menu' : 'hide-menu'}>
          <li onClick={()=>handleThemeChange('blueTheme')}>
            <img src="images/bluetheme.svg" alt="theme" />
          </li>
          <li onClick={()=>handleThemeChange('rainbowTheme')}>
            <img src="images/rainbowtheme.svg" alt="theme" />
          </li>
          <li onClick={()=>handleThemeChange('originTheme')}>
            <img src="images/originaltheme.svg" alt="theme" />
          </li>
        </S.ToggleTheme>
      </S.ThemeContainer>
      <B.BookContainer>
        <S.BehindWrap>
          <OpenBookRight>
            <D.DiviContainer style={{zIndex: '0'}}>
              <DL.NonDiaryContainer>
                <img src="images/write.svg" alt="list"/>
                <div>
                  <span>{year}년 {month}월 {day}일</span>
                의<br />하루를 기록해볼까요?
                </div>
                <DL.GotoDiaryWrite to='/write' state={{date:choiceDate}}>
                일기 쓰러 가기
                </DL.GotoDiaryWrite>
              </DL.NonDiaryContainer>
            </D.DiviContainer>
          </OpenBookRight>
          <Bookmark />
        </S.BehindWrap>
        <S.FrontWrap>
          <S.Left/>
          <S.Flip className='flip'>
            <S.BackBtn path={path} onClick={()=>navigate(-1)}>
              <RiArrowLeftSLine size={70} />
            </S.BackBtn>
            <S.Mid>
              {children}
            </S.Mid>
            <S.Right />
          </S.Flip>   
        </S.FrontWrap>
      </B.BookContainer>
    </S.Container>
  )
}

export default ClosedBook