import React from 'react';
import Swal, { SweetAlertResult } from 'sweetalert2';
import styled from 'styled-components';
import { IoLogOutOutline } from "react-icons/io5";
import { logout } from '@/apis/auth';


type Props = SweetAlertResult<any>;

export default function LogoutBtn() {
  const { mutate } = logout()
  
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
        const access = sessionStorage.getItem('token');
        const refresh = sessionStorage.getItem('refresh');
        mutate({
          accessToken: access,
          refreshToken: refresh
        })
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