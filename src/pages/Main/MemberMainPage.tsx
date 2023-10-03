import {useState, useEffect, useRef} from 'react';
import { useNavigate } from 'react-router-dom';
import './components/Modal.css';
import baseAxios from '../../apis/baseAxios';
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
  const extension = useRef<string | null>(null)
  const [nickname, setNickname] = useState<string | null>(null)
  const navigate = useNavigate();
  const imgRef = useRef<HTMLInputElement | null>(null);
  const { success, confirmLogout, setConfirmLogout } = useStore()
  const { mutate } = logout()
  let now = new Date();
  let year = now.getFullYear();

  useEffect(() => {
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
    baseAxios.get('users/profile').then((res) => {
      const { profile_image : userProfileImage } = res.data.data
      sessionStorage.setItem('profile_image', userProfileImage)
      setSelected(userProfileImage)
    }).catch((err) => console.log(err))

    if (sessionStorage.getItem('nickname')) {
      setNickname(sessionStorage.getItem('nickname'))
    } else {
      baseAxios.get('users/profile').then((res) => {
        console.log(res)
        const { theme: userTheme, nickname: userNickname, profile_image : userProfileImage } = res.data.data
        sessionStorage.setItem('nickname', userNickname)
        sessionStorage.setItem('theme', userTheme)
        sessionStorage.setItem('profile_image', userProfileImage)
        setNickname(userNickname)
        checkTheme(userTheme)
        setSelected(userProfileImage)
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
        const result = reader.result as string
        const slash = result.indexOf('/')
        const semiColumn = result.indexOf(';')
        extension.current = result.slice(slash + 1, semiColumn)
      }
    }
  }

  const openDiary = () => {
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

  const startDiary = async () => {
    const config = {
      headers: { 'Content-Type': 'multipart/form-data'},
    };
    let form = new FormData();
    console.log(extension.current)
    if (extension.current) {
      let myImg = selected.replace(`data:image/${extension.current};base64,`, '');
      const byteString = atob(myImg);
      const array = [];
      for (let i = 0; i < byteString.length; i++) {
        array.push(byteString.charCodeAt(i));
      }
      const u8arr = new Uint8Array(array);
      const file = new Blob([u8arr], { type: 'image/png' });
      console.log(file);
      form.append('file', file);
      await baseAxios.put('users/profile', form, config).then((res) => {
        console.log(res)
      }).catch((err) => {
        console.log(err)
      })
    }
    openDiary()
  }

  const onLogout = () => {
    setConfirmLogout(false)
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
      <C.CommonFilledBtn onClick={startDiary} isValid={false}>시작하기</C.CommonFilledBtn>
      <LogoutBtn />
      {success && <Modal onClick={()=>{}} icon='success' version='one_btn' title="로그인 성공!" content="" />}
      {confirmLogout && <Modal onClick={onLogout} icon='warning' version='two_btn' title="로그아웃하시겠습니까?" content="" />}
    </ClosedBook>
  );
}

export default AfterLogin;