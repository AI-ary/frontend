import styled from 'styled-components';
import { Link } from 'react-router-dom';
import BookCover from '../../components/bookshape/BookCover';
import Navbar from '@/components/Navbar';

const LinkBox = styled.div`
  width: 110%;
  margin: auto;
  padding-bottom : 10px;
  display: flex;
  text-align: center;
  position: relative;
  left: 2.5px;
  `

const ShowImage = styled.img`
  display: flex;
  justify-contents : center;
  align-items : center;
  width: 420px;
  heigth: 450px;
  `
export const Control = styled.div`
display: flex;
justify-content : center;
flex-direction : column;
align-items : center;
position: relative;
top: 10px;`

export const Titles = styled.div`
display: flex;
justify-contents : center;
align-items : center;
font-size: 70px;`

function Main() {
  return(
    <>
      <BookCover>
        <Control>
          <Titles>G.Diary</Titles>
          <ShowImage src='images/logo.png' />
          <LinkBox>
            <Link to='/signin' className='link'>로그인</Link>
            <Link to='/signup' className='link'>회원가입</Link>
            <Link to='/about' className='link'>소개</Link>
          </LinkBox>
        </Control>
      </BookCover>
    </>
  
  );
}

export default Main;