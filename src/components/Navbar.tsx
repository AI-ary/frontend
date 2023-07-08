import React, {useState, DetailedHTMLProps, InputHTMLAttributes } from 'react';
import styled, { css, keyframes } from 'styled-components';
import {FaUserAlt, FaSearch} from 'react-icons/fa';
import { Outlet, useNavigate } from 'react-router-dom';


interface SearchInputProps extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  visible: boolean;
}

function Navbar() {
  const navigate = useNavigate();
  const [visible, setVisible] = useState<boolean>(false);
  const [search, setSearch]=useState<string>('');

  const onChange = (e: React.ChangeEvent<HTMLInputElement>)=>{
    setSearch(e.target.value);
  }

  const handleSearch = async () =>{
    if(visible){
      if(search.trim() === ''){
        alert('검색어를 입력해주세요!');
      }else{
        window.location.href = '/search/'+search; 
      }
    } else{
      setVisible(!visible);
    }
  }

  const handleEnter = (e:React.KeyboardEvent<HTMLInputElement>) =>{
    if(e.key == 'Enter'){
      handleSearch();
    }
  };

  return(
    <>
      <NavbarWrap>
        <Logo onClick={()=>navigate('main')}>GRIM-DIARY</Logo>
        <BtnContainer>
          <button onClick={()=>navigate('about')}>소개</button>
          <button>커뮤니티</button>
          <SearchContainer>
            {visible && <SearchInput visible={visible} type="text" value={search} placeholder='검색 창' onChange={onChange} onKeyDown={(e)=>handleEnter(e)} /> }
            <FaSearch size="25" style={{cursor:'pointer'}} onClick={handleSearch} />
          </SearchContainer>
          <button><FaUserAlt size="25" /></button>
        </BtnContainer>
      </NavbarWrap>
      <Outlet/>
    </>
  )
}


export default Navbar;

const NavbarWrap = styled.div`
  position: fixed;
  width: 100%;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 100px;
  color: black;
  background-color: white;
`

const Logo = styled.div`
  font-size: 2.3rem;
  cursor: pointer;
`

const BtnContainer = styled.div`
  width: 50rem;
  font-size: 1.4rem;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  >button{
    margin-right: 30px;
  }
  >button:last-child{
    margin-left: 30px;
  }
`
// 검색창 보이는 여부에 따라 효과 적용 
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  jusitfy-content: center;
`
const SearchInput = styled.input<SearchInputProps>`
  ${({ visible }) =>
  visible &&
  css`
    animation: ${fadeIn} 0.4s;
  `};
  margin-right: 10px;
`