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
  const width = window.innerWidth
  
  let marginLeft : string
  if (width > 1440) {
    marginLeft = '-55px'
  } else if (width <= 1440 && width > 1180) {
    marginLeft = '-10px'
  } else {
    marginLeft = '-6px'
  }
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
            behind.style.marginLeft = marginLeft
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
      <button style={{position:'absolute'}} onClick={onClose}>닫기</button>
      <O.OpenBookLeft>
        <S.FrontWrap style={{zIndex:-1, transform:'rotateY(180deg)', top:'0px',left:'0px'}} className='behind'>
          <S.Left/>
          <S.Flip className='flip'>
            <S.BackBtn path={''}>
              <RiArrowLeftSLine size={70} />
            </S.BackBtn>
            <S.Mid>
              <O.CoverYear>{year}</O.CoverYear>
              <O.Nickname><p><span>{nickname}</span>'s</p><p>GRIM-DIARY</p></O.Nickname>
              <O.Profile>
                <img alt='star' src='images/rainbow.png' />
              </O.Profile>
              <O.SelectBtn htmlFor="input-file">
                <MdPhotoLibrary size="28" className='profile'/>
              </O.SelectBtn>
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