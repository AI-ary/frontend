import React from 'react';
import * as O from '../../styles/bookshape/opendbook.style';
import * as S from '../../styles/bookshape/closedbook.style'
import * as C from '../../styles/common.style'
import { RiArrowLeftSLine } from 'react-icons/ri';
import { MdPhotoLibrary } from 'react-icons/md';
import LogoutBtn from '@/pages/Auth/components/Logout';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';


type OpenBookLeftProps = {
  children:React.ReactNode;
}

function OpenBookLeft({ children }:OpenBookLeftProps) {
  const nickname = sessionStorage.getItem('nickname');
  const navigate = useNavigate()
  let now = new Date();
  let year = now.getFullYear();

  const onClose = () => {
    let willClose : HTMLElement | null = document.querySelector('.will-close')
    let willMove : HTMLElement | null = document.querySelector('.will-move')
    let behind : HTMLElement | null = document.querySelector('.behind')
    if (willClose && willMove) {
      willClose.classList.add('closeStart')
      willMove.classList.add('move-close')
      setTimeout(() => {
        if (willClose) {
          willClose.classList.add('close');
        }
        setTimeout(() => {
          if (behind && willClose) {
            willClose.style.zIndex = '6'
            behind.style.zIndex = '50'
            behind.style.marginLeft = '-10px'
          }
          setTimeout(() => {
            navigate('/main')
          }, 250)
        },250)
        
      }, 800);
    }
  }
  return ( 
    <div className='will-close' style={{height:'100%'}}>
      <O.OpenBookLeft>
        <S.FrontWrap style={{zIndex:-1, transform:'rotateY(180deg)', top:'0px',left:'0px'}} className='behind'>
          <S.Left/>
          <S.Flip className='flip'>
            <S.BackBtn path={''}>
              <RiArrowLeftSLine size={70} />
            </S.BackBtn>
            <S.Mid>
              <CoverYear>{year}</CoverYear>
              <Nickname><p><span>{nickname}</span>'s</p><p>GRIM-DIARY</p></Nickname>
              <Profile>
                <img alt='star' src='images/rainbow.png' />
              </Profile>
              <SelectBtn htmlFor="input-file">
                <MdPhotoLibrary size="28" className='profile'/>
              </SelectBtn>
              <input type="file" id="input-file" accept="image/png, image/jpeg, image/svg+xml" style={{display:'none'}} /> 
              <C.CommonFilledBtn isValid={false}>시작하기</C.CommonFilledBtn>
              <LogoutBtn/>
            </S.Mid>
            <S.Right />
          </S.Flip>    
        </S.FrontWrap>
        {children}
        <O.Line position="right" deg="to right" />
      </O.OpenBookLeft>
    </div>
  )
}

export default OpenBookLeft;

const CoverYear = styled.div`
  font-size: 24px;
  font-family:'Itim';
  margin-bottom: 10px;
`

const Nickname = styled.h1`
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  position: relative;
  bottom: 22px;
  font-size: 45px;
  font-family:'Itim';
  > p > span {
    font-family:'Poor Story';
  }
`
const Profile = styled.div`
  width: 260px;
  height: 260px;
  border-radius: 50%;
  background-color: white;
  border: 8px solid ${props => props.theme.lineColor};
  overflow: hidden;
  background-image: url('/images/profileBg.svg');
  > img {
    width: 100%;
    height: 100%; 
    object-fit: cover;
  }
`
const SelectBtn = styled.label`
  background-color: ${props => props.theme.lineColor};
  position: relative;
  top: -80px;
  left: 90px;
  border-radius: 50%;
  padding: 18px;
  cursor: pointer;
  box-sizing: border-box;
  .profile {
    color: ${props => props.theme.profileColor};
  }
  `
