import React, {useState, useEffect} from 'react';
import BookCover from '../../components/bookshape/BookCover';
import OpenModal from './components/OpenModal';
import { useNavigate } from 'react-router-dom';
import './components/Modal.css';
import api from '../../apis/axios'
import { Button, makeStyles } from '@material-ui/core';
import Swal from 'sweetalert2';
import * as S from '../../styles/main/main.style'

function AfterLogin() {
  const [selected, setSelected] = useState<string>('images/mainLogo.png');
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const navigate = useNavigate();
  const classes = useStyles();
  const nickname = sessionStorage.getItem('nickname');
  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true
  })
  
  useEffect(() => {
    api.get(`/users/${sessionStorage.getItem('id')}`).then(function (res) {
      setSelected(res.data.cover_image_url)
    }).catch(function (err) {
      console.log(err)
    })
  }, [])
  
  function Other() {
    setIsOpen(true);
  }

  function onClick(e : React.MouseEvent ) {
    e.preventDefault();
    // api.defaults.headers.common['Authorization'] = `Bearer ${sessionStorage.getItem('token')}`
    // api.patch(`users/${sessionStorage.getItem('id')}/`, {
    //   cover_image_url: selected
    // }).then(function (res) {
    let flip : Element | null= document.querySelector('.flip');
    let slide : Element | null = document.querySelector('.slide');
    if (slide) {
      slide.classList.add('move');
      setTimeout(() => {
        if (flip) {
          flip.classList.add('open');
          flip.classList.toggle('color');
          setTimeout(() => {
            navigate('/list');
          }, 400);
        }
      }, 800);
    }
    //   console.log(Toast)
    //   Toast.fire({
    //     icon: 'success',
    //     title: '표지 설정 완료!'
    //   })
    // }).catch(function (err) {
    //   console.log(err)
    // })
  }
  return (
    <>
      <OpenModal isOpen={isOpen} setIsOpen={setIsOpen} setSelected={setSelected} />
      <BookCover>        
      <S.Nickname>{nickname}'s<br/>일기장</S.Nickname>
      <S.Wrap>
        <div className='Img'>
          <img style={{objectFit:'cover'}} alt='star' src={!!selected ? `${selected}` : 'images/mainLogo.png'} />
        </div>
        <S.SelectBtn>
          <Button
            variant='outlined' className={classes.customHoverFocus} type='button' onClick={Other} style={{
              width: '110px',
              height: '30px',
              borderRadius: '25px',
              fontSize: '17px',
              fontWeight: 'bolder'
            }}>+다른 이미지</Button>
        </S.SelectBtn>
        <S.StartBtn>
          <Button
            className={classes.customHoverFocus} type='button' onClick={(e)=>onClick(e)} style={{
              width: '100px',
              height: '40px',
              borderRadius: '25px',
              fontSize: '25px',
              fontWeight: 'bolder'
            }}>시작</Button>
        </S.StartBtn>
      </S.Wrap>
 
      </BookCover>
    </>
  );
}

export default AfterLogin;

const useStyles = makeStyles(theme => ({
  customHoverFocus: {
    '&:hover, &.Mui-focusVisible': { backgroundColor: 'rgb(255, 215, 17)' }
  }
}));