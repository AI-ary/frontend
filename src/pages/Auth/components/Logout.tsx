import React from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../../apis/baseAxios'
import Swal, { SweetAlertResult } from 'sweetalert2';
import styled from 'styled-components';
import { IoLogOutOutline } from "react-icons/io5";

type Props = SweetAlertResult<any>;

export default function LogoutBtn() {
  const navigate = useNavigate();
  
  function onClick(e : React.MouseEvent) {
    Swal.fire({
      title: '로그아웃하시겠습니까?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '네',
      cancelButtonText: '아니오'
    }).then((result: Props) => {
      console.log(result)
      if (result.isConfirmed) {
        Swal.fire(
          '로그아웃 성공!',
          '',
          'success'
        )
        api.defaults.headers.common['Authorization'] = null;
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('refresh');
        sessionStorage.removeItem('nickname');
        sessionStorage.removeItem('id');
        navigate('/')
      }
    })
  }
  return (
    <LogOutBtn type='button' onClick={(e:any)=>onClick(e)}>
      <span>로그아웃</span>
      <IoLogOutOutline size="24" className='logOutIcon'/>
    </LogOutBtn>
  )
}

const LogOutBtn = styled.button`
  padding: 20px;
  box-sizing: border-box;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  > span {
    font-size: 18px;
    font-family:'Poor Story';
    color: ${props => props.theme.btnColor};
    margin-right: 5px;
  }
  .logOutIcon {
    color: ${props => props.theme.btnColor};
  }
`