import styled from 'styled-components';
import { IoLogOutOutline } from 'react-icons/io5';
import { useStore } from '@/store/store';

export default function LogoutBtn() {
  const { setConfirmLogout } = useStore();

  function onClick() {
    setConfirmLogout(true);
  }
  return (
    <LogOutBtn type='button' onClick={onClick}>
      <span>로그아웃</span>
      <IoLogOutOutline size='24' className='logOutIcon' />
    </LogOutBtn>
  );
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
    font-family: 'Poor Story';
    color: ${(props) => props.theme.btnColor};
    margin-right: 5px;
  }
  .logOutIcon {
    color: ${(props) => props.theme.btnColor};
  }
`;
