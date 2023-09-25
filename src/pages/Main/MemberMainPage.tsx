import {useState, useEffect, useRef} from 'react';
import { useNavigate } from 'react-router-dom';
import './components/Modal.css';
import api from '../../apis/baseAxios';
import * as C from '../../styles/common.style';
import ClosedBook from '@/components/bookshape/ClosedBook';
import LogoutBtn from '../../pages/Auth/components/Logout';
import { MdPhotoLibrary } from 'react-icons/md';
import * as O from '../../styles/bookshape/opendbook.style'
import { useStore } from '@/store/store';
import Modal from '@/components/Modal';
import { logout } from '@/apis/auth';
import { useThemeContext } from '@/App';

function AfterLogin() {
  const {changeThemeType} =useThemeContext()
  const [selected, setSelected] = useState<string>('images/rainbow.png');
  const [nickname, setNickname] = useState<string | null>(null)
  const navigate = useNavigate();
  const imgRef = useRef<HTMLInputElement | null>(null);
  const { success, confirm, setConfirm } = useStore()
  const { mutate } = logout()
  let now = new Date();
  let year = now.getFullYear();

  useEffect(() => {
    // api.get(`/users/${sessionStorage.getItem('id')}`).then(function (res) {
    //   setSelected(res.data.cover_image_url)
    // }).catch(function (err) {
    //   console.log(err)
    // })
    const checkTheme = (theme : string | null) => {
      switch (theme) {
      case 'BLUE': {
        changeThemeType('blueTheme')
        break;
      }
      case 'RAINBOW': {
        changeThemeType('rainbowTheme')
        break;
      }
      case 'ORIGINAL': {
        changeThemeType('originTheme')
        break;
      }
      }
    }
    if (sessionStorage.getItem('nickname')) {
      setNickname(sessionStorage.getItem('nickname'))
    } else {
      api.get('users/profile').then((data) => {
        const { theme: userTheme, nickname: userNickname } = data.data.data
        sessionStorage.setItem('nickname', userNickname)
        sessionStorage.setItem('theme', userTheme)
        setNickname(userNickname)
        checkTheme(userTheme)
      }).catch((err) => console.log(err))
    }
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

  function onClick() {
    // api.patch(`users/${sessionStorage.getItem('id')}/`, {
    //   cover_image_url: selected
    // }).then(function (res) {
    let flip : Element | null= document.querySelector('.flip');
    let slide : Element | null = document.querySelector('.slide');
    if (slide && flip) {
      flip.classList.add('flipStart')
      slide.classList.add('move');
      setTimeout(() => {
        if (flip) {
          flip.classList.add('open');
          setTimeout(() => {
            navigate('/list');
          }, 450);
        }
      }, 800);
    }
  }

  const onLogout = () => {
    setConfirm(false)
    const access = sessionStorage.getItem('token');
    const refresh = sessionStorage.getItem('refresh');
    mutate({
      access_token: access,
      refresh_token: refresh
    })
  }

  return (
    <ClosedBook>
      <O.CoverYear>{year}</O.CoverYear>
      <O.Nickname><p><span>{nickname}</span>'s</p><p>GRIM-DIARY</p></O.Nickname>
      <O.Profile>
        <img alt='star' src={!!selected ? `${selected}` : 'images/rainbow.png'} />
      </O.Profile>
      <O.SelectBtn htmlFor="input-file">
        <MdPhotoLibrary className='profile'/>
      </O.SelectBtn>
      <input type="file" id="input-file" accept="image/png, image/jpeg, image/svg+xml" style={{display:'none'}} onChange={addFile} ref={imgRef} /> 
      <C.CommonFilledBtn onClick={onClick} isValid={false}>시작하기</C.CommonFilledBtn>
      <LogoutBtn />
      {success && <Modal onClick={()=>{}} icon='success' version='one_btn' title="로그인 성공!" content="" />}
      {confirm && <Modal onClick={onLogout} icon='warning' version='two_btn' title="로그아웃하시겠습니까?" content="" />}
    </ClosedBook>
  );
}

export default AfterLogin;