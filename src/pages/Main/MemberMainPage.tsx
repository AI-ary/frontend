import {useState, useEffect, useRef} from 'react';
import { useNavigate } from 'react-router-dom';
import './components/Modal.css';
import api from '../../apis/baseAxios'
import * as C from '../../styles/common.style'
import styled from 'styled-components';
import Swal from 'sweetalert2';
import ClosedBook from '@/components/bookshape/ClosedBook';
import LogoutBtn from '../../pages/Auth/components/Logout';
import { MdPhotoLibrary } from "react-icons/md";


function AfterLogin() {
  const [selected, setSelected] = useState<string>('images/rainbow.png');
  const navigate = useNavigate();
  const nickname = sessionStorage.getItem('nickname');
  const imgRef = useRef<HTMLInputElement | null>(null);

  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true
  })
  
  let now = new Date();
  let year = now.getFullYear();

  useEffect(() => {
    api.get(`/users/${sessionStorage.getItem('id')}`).then(function (res) {
      setSelected(res.data.cover_image_url)
    }).catch(function (err) {
      console.log(err)
    })
  }, [])



  const addFile = ()=>{
    const imgFile = imgRef.current;
    if (imgFile?.files) {
      const file=imgFile?.files[0];
      const reader=new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend=()=>{
        setSelected(reader.result as string);
      }
    }
  }

  function onClick(e : React.MouseEvent ) {
    // e.preventDefault();
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
          }, 450);
        }
      }, 800);
    }
  }

  return (
    <ClosedBook>
      <CoverYear>{year}</CoverYear>
      <Nickname><p><span>{nickname}</span>'s</p><p>GRIM-DIARY</p></Nickname>
      <Profile>
        <img alt='star' src={!!selected ? `${selected}` : 'images/rainbow.png'} />
      </Profile>
      <SelectBtn htmlFor="input-file">
          <MdPhotoLibrary size="28" className='profile'/>
      </SelectBtn>
      <input type="file" id="input-file" accept="image/png, image/jpeg, image/svg+xml" style={{display:'none'}} onChange={addFile} ref={imgRef} /> 
      {/* <StartBtn>
        <Button
          className={classes.customHoverFocus} type='button' onClick={(e)=>onClick(e)} style={{
            width: '100px',
            height: '40px',
            borderRadius: '25px',
            fontSize: '25px',
            fontWeight: 'bolder'
          }}>시작</Button>
      </StartBtn> */}
      <C.CommonFilledBtn onClick={(e)=>onClick(e)} isValid={false}>시작하기</C.CommonFilledBtn>
      <LogoutBtn/>
    </ClosedBook>
  );
}

export default AfterLogin;

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
  border: 8px solid ${props => props.theme.profileBg};
  overflow: hidden;
  background-image: url('/images/profileBg.svg');
  > img {
    width: 100%;
    height: 100%; 
    object-fit: cover;
  }
`
const SelectBtn = styled.label`
  background-color: ${props => props.theme.profileBg};
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
