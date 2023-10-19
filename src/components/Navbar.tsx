import React, {useState, DetailedHTMLProps, InputHTMLAttributes, useEffect } from 'react';
import styled, { css, keyframes } from 'styled-components';
import { useStore } from '../store/store';
import { Outlet, useNavigate, useLocation, Link } from 'react-router-dom';
import { useParams } from 'react-router';
import Modal from './Modal';
import IsLogin from '@/pages/Auth/components/IsLogin';

interface SearchInputProps extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  visible: boolean;
}

interface SearchContainerProps {
  margin: boolean; // Add the margin prop
}

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const param = useParams();
  const searchText = param.word;
  const [visible, setVisible] = useState<boolean>(false);
  const [search, setSearch]=useState<string>('');
  const { setChoiceImg, setChoiceDalleImg, setGetGrimList, setGetDalleList } = useStore();
  const [searchWarning, setSearchWarning] = useState<boolean>(false)
  const [notLoggedinSearchWarning, setNotLoggedinSearchWarning] = useState<boolean>(false)
  const [notAvailable, setNotAvailable] = useState<boolean>(false)
  
  useEffect(()=>{
    if(location.pathname.startsWith('/search/')){
      setSearch(searchText ?? '');
      setVisible(true);
    }else{
      setSearch('');
      setVisible(false);
    }
  }, [location.pathname]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>)=>{
    setSearch(e.target.value);
  }

  const handleSearch = async () => {
    if (IsLogin()) {
      if(visible){
        if(search.trim() === ''){
          // alert('검색어를 입력해주세요!');
          setSearchWarning(true)
        }else{
          setChoiceImg([]);
          setChoiceDalleImg('');
          setGetDalleList([]);
          setGetGrimList([]);
          navigate('/search/'+search);
        }
      } else{
        setVisible(!visible);
      }
    } else {
      setNotLoggedinSearchWarning(true)
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
        <Logo onClick={()=> {
            setChoiceImg([]);
            setChoiceDalleImg('');
            setGetDalleList([]);
            setGetGrimList([]);
            navigate('main'); }}>
          <img src="/images/aiary.png" alt="logo" />
        </Logo>
        <BtnContainer>
          <StyledLink to="/introduce">소개</StyledLink>
          <button onClick={()=>setNotAvailable(true)}>커뮤니티</button>
          <SearchContainer margin={visible}>
            {IsLogin() && 
              visible && 
              <SearchInputWrap>
                <SearchInput visible={visible} type="text" value={search} placeholder={'검색어를 입력하세요'} onChange={onChange} onKeyDown={(e)=>handleEnter(e)} />
              </SearchInputWrap>
            }
            <SearchImgWrap onClick={handleSearch}>
              <img src="/images/search.svg" alt="search" />
            </SearchImgWrap>
          </SearchContainer>
          <UserWrap onClick={()=>setNotAvailable(true)}>
            <img src="/images/person.svg" alt="person" />  
          </UserWrap>
        </BtnContainer>
        {searchWarning && <Modal onClick={()=>{setSearchWarning(false)}} icon='warning' version='one_btn' title="검색어를 입력해주세요!" content="" />}
        {notLoggedinSearchWarning && <Modal onClick={()=>{setNotLoggedinSearchWarning(false)}} icon='warning' version='one_btn' title="로그인 후 사용 가능합니다!" content="" />}
        {notAvailable && <Modal onClick={()=>{setNotAvailable(false)}} icon='warning' version='one_btn' title="해당 서비스는 아직 이용할 수 없습니다." content="" />}
      </NavbarWrap>
      <Outlet />
    </>
  )
}


export default Navbar;

const NavbarWrap = styled.div`
  position: sticky;
  width: 100%;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 130px;
  color: black;
`

const Logo = styled.div`
  cursor: pointer;
  > img {
    width: 130px;
  }
`

const BtnContainer = styled.div`
  width: 50rem;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  > button{
    font-family:'Poor Story';
    margin-right: 50px;
    font-size: 20px;
    color: #6A6A6A;
  }
`
// 검색창 보이는 여부에 따라 효과 적용 
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateX(10px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const SearchContainer = styled.div<SearchContainerProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 32px;
  margin-left: ${props=>props.margin?'0px':'30px'};;
`

const SearchInputWrap = styled.div`
  display: flex;
  align-items: center;
  jusitfy-content: center;
  width: 230px;
  height: 37px;
  border-radius: 24px;
  background-color: #FEFDFE;
`

const SearchImgWrap = styled.div`
  position: absolute;
  right: 185px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #EB8888;
  box-sizing: border-box;
  margin-right: 15px;
  cursor: pointer;
`

const SearchInput = styled.input<SearchInputProps>`
  ${({ visible }) =>
  visible &&
  css`
    animation: ${fadeIn} 0.4s;
  `};
  width: 180px;
  margin-left: 10px;
  height: 100%;
  padding: 10px 5px;
  box-sizing: border-box;
  font-family: 'Inter';
  color: #B4B4B4;
  font-size: 14px;
  border: none;
  background-color: transparent;
  &:focus{
    outline: none;
  }
`

const UserWrap = styled.div`
  width: 38px;
  height: 38px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #78ADE1;
  margin-top: 2px;
  cursor: pointer;
`

const StyledLink = styled(Link)`
  font-family:'Poor Story';
  margin-right: 50px;
  font-size: 20px;
  color: #6A6A6A; 
`