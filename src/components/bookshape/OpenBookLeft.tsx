import React from 'react';
import * as O from '../../styles/bookshape/opendbook.style';
import * as S from '../../styles/bookshape/closedbook.style';
import * as C from '../../styles/common.style';
import { RiArrowLeftSLine } from 'react-icons/ri';
import { MdPhotoLibrary } from 'react-icons/md';
import LogoutBtn from '@/pages/Auth/components/Logout';

type OpenBookLeftProps = {
  children: React.ReactNode;
  withClose: boolean;
};

function OpenBookLeft({ children, withClose }: OpenBookLeftProps) {
  const nickname = sessionStorage.getItem('nickname');

  let now = new Date();
  let year = now.getFullYear();

  return (
    <div className='will-close' style={{ height: '100%' }}>
      <O.OpenBookLeft>
        {withClose && (
          <S.FrontWrap
            style={{
              zIndex: -1,
              transform: 'rotateY(180deg)',
              top: '0px',
              left: '0px',
            }}
            className='behind'
          >
            <S.Left />
            <S.Flip className='flip'>
              <S.BackBtn path={''}>
                <RiArrowLeftSLine size={70} />
              </S.BackBtn>
              <S.Mid>
                <O.CoverYear>{year}</O.CoverYear>
                <O.Nickname>
                  <p>
                    <span>{nickname}</span>'s
                  </p>
                  <p>GRIM-DIARY</p>
                </O.Nickname>
                <O.Profile>
                  <img alt='star' src='images/rainbow.png' />
                </O.Profile>
                <O.SelectBtn htmlFor='input-file'>
                  <MdPhotoLibrary className='profile' />
                </O.SelectBtn>
                <input
                  type='file'
                  id='input-file'
                  accept='image/png, image/jpeg, image/svg+xml'
                  style={{ display: 'none' }}
                />
                <C.CommonFilledBtn isValid={false}>시작하기</C.CommonFilledBtn>
                <LogoutBtn />
              </S.Mid>
              <S.Right />
            </S.Flip>
          </S.FrontWrap>
        )}
        {children}
        <O.Line position='right' deg='to right' />
      </O.OpenBookLeft>
    </div>
  );
}

export default OpenBookLeft;
