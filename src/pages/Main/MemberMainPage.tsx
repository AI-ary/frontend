import {useState, useEffect, useRef} from 'react';
import { useNavigate } from 'react-router-dom';
import './components/Modal.css';
import api from '../../apis/baseAxios';
import * as C from '../../styles/common.style';
import ClosedBook from '@/components/bookshape/ClosedBook';
import LogoutBtn from '../../pages/Auth/components/Logout';
import { MdPhotoLibrary } from "react-icons/md";
import * as O from '../../styles/bookshape/opendbook.style'

function AfterLogin() {
  const [selected, setSelected] = useState<string>('images/rainbow.png');
  const navigate = useNavigate();
  const nickname = sessionStorage.getItem('nickname');
  const imgRef = useRef<HTMLInputElement | null>(null);
  
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

  return (
    <ClosedBook>
      <O.CoverYear>{year}</O.CoverYear>
      <O.Nickname><p><span>{nickname}</span>'s</p><p>GRIM-DIARY</p></O.Nickname>
      <O.Profile>
        <img alt='star' src={!!selected ? `${selected}` : 'images/rainbow.png'} />
      </O.Profile>
      <O.SelectBtn htmlFor="input-file">
          <MdPhotoLibrary size="28" className='profile'/>
      </O.SelectBtn>
      <input type="file" id="input-file" accept="image/png, image/jpeg, image/svg+xml" style={{display:'none'}} onChange={addFile} ref={imgRef} /> 
      <C.CommonFilledBtn onClick={(e)=>onClick(e)} isValid={false}>시작하기</C.CommonFilledBtn>
      <LogoutBtn/>
    </ClosedBook>
  );
}

export default AfterLogin;