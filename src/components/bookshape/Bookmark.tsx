import styled from 'styled-components';
import { NavLink, useLocation } from 'react-router-dom';
import IsLogin from '../../pages/Auth/components/IsLogin';
import { useStore } from '../../store/store';

function Bookmark() {
  // const location = useLocation();
  const { setChoiceImg, setGetGrimList } = useStore();
  const width = window.innerWidth
  
  let marginLeft : string
  if (width > 1440) {
    marginLeft = '-55px'
  } else if (width <= 1440 && width > 1180) {
    marginLeft = '-10px'
  } else {
    marginLeft = '-6px'
  }
  // let loca = location.pathname;

  // useEffect(() => {
  //   if (loca === '/signin' || loca === '/signup' || (IsLogin() && loca === '/')) {
  //     document.getElementById('home').style.backgroundColor = '#F0DB6D';
  //     document.getElementById('home').style.color = 'black';
  //     document.getElementById('home').style.fontWeight = '700';
  //   } else if (loca === '/write') {
  //     document.getElementById('write').style.backgroundColor = '#F0DB6D';
  //     document.getElementById('write').style.color = 'black';
  //     document.getElementById('write').style.fontWeight = '700';
  //   }
  // }, []);

  // function Valid() {
  //   if (loca === '/' || loca === '/signin' || loca === '/signup' || (!IsLogin() && loca === '/about') || (IsLogin() && loca === '/main')) {
  //     return 'none';
  //   } else {
  //     return '';
  //   }
  // }

  function onClick() {
    setChoiceImg([]);
    setGetGrimList([]);
    // let willClose : HTMLElement | null = document.querySelector('.will-close')
    // let willMove : HTMLElement | null = document.querySelector('.will-move')
    // let behind : HTMLElement | null = document.querySelector('.behind')
    // if (willClose && willMove) {
    //   willClose.classList.add('closeStart')
    //   willMove.classList.add('move-close')
    //   setTimeout(() => {
    //     if (willClose) {
    //       willClose.classList.add('close');
    //     }
    //     setTimeout(() => {
    //       if (behind && willClose) {
    //         willClose.style.zIndex = '6'
    //         behind.style.zIndex = '50'
    //         behind.style.marginLeft = marginLeft
    //       }
    //       setTimeout(() => {
    //         navigate('/main')
    //       }, 250)
    //     },250)
    //   }, 800);
    // }
  }

  return (
    <BookMark>
      <StyledNavLink to={IsLogin() ? '/main' : '/'} onClick={onClick}>
        <div id='home' >
          홈
        </div>
      </StyledNavLink>
      <StyledNavLink id='write' to='/list' onClick={onClick}>
        {/* style={{ pointerEvents: Valid() }}  */}
        일기 쓰기
      </StyledNavLink>
    </BookMark>
  );
}

export default Bookmark;

export const BookMark = styled.div`
  display : flex;
  flex-direction : column;
  height: 95%;
`;
export const StyledNavLink = styled(NavLink)`
  display: flex;
  justify-content: center;
  align-items: center;
  width : 90px;
  height : 60px;
  text-decoration: none;
  margin-bottom: 15px;
  font-size: 18px;
  font-family: 'Poor Story';
  border-radius : 0px 8px 8px 0px;
  text-align: center;
  color: ${props => props.theme.bookMarkFont};
  background-color: ${props => props.theme.bookMarkBg};
  &:link {
    transition: 0.5s;
    text-decoration: none;
  }
  &.active {
    background-color: ${props => props.theme.bookMarkActiveBg};
    color: ${props => props.theme.bookMarkFont};
    font-weight: 700;
  }
`;