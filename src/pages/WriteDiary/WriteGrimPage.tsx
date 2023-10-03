import { useState, useRef } from 'react'
import DiaryContent from './components/DiaryContent';
import GrimChoice from '../WriteDiary/components/GrimChoice';
import OpenBookLeft from '../../components/bookshape/OpenBookLeft';
import OpenBookRight from '../../components/bookshape/OpenBookRight';
import Bookmark from '../../components/bookshape/Bookmark';
import Loading from '../../components/Loading';
import * as O from '../../styles/bookshape/opendbook.style'
import * as C from '../../styles/bookshape/closedbook.style';
import DalleChoice from './components/DalleChoice';

function WriteGrim(){
  const [isSelectedDalle, setIsSelectedDalle] = useState<boolean>(false);
  const [isLoading, setIsLoading]=useState<boolean>(false);
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const loadingState = useRef(isLoading);

  const checkSelectedDalle = (check:boolean) => {
    setIsSelectedDalle(check);
  }

  let percentNum: number;
  let percent: HTMLElement | null;
  let percentBar: HTMLElement | null;
  let timer: number;

  const startLoading = () => {
    setIsLoading(true);
    loadingState.current = true
    console.log('start');
    percentNum = Math.floor(Math.random() * 5 + 1);
    timer = setInterval(() => {
      console.log(percentNum + '%');
      percent = document.querySelector('#percent');
      percentBar = document.querySelector('#percentBar');
      console.log('loadingState : ',loadingState.current)
      if (percent !== null && percentBar !== null) {
        percent.textContent = `${percentNum}%`;
        percentBar.style.width = `${percentNum}%`;
      }
      percentNum += Math.floor(Math.random() * 20 + 1);
      if (!loadingState.current) {
        clearInterval(timer)
      }
      if (percentNum > 100) {
        console.log('로딩 완료');
        clearInterval(timer);
        if (percent !== null && percentBar !== null) {
          percent.textContent = '100%';
          percentBar.style.width = '100%';
        }
        loadingState.current = false
        setTimeout(() => {
          setIsLoading(false);
        }, 500);
      }
    }, 1000); 
  };

  const cancelLoading = () => {
    console.log('cancel');
    loadingState.current = false
    // 가져오기 취소 후 1초 동안 버튼 못 누르게하기
    // clearInterval이 로딩 1번 더 하고나서 실행되기 때문에 1초 동안 그림 가져오기 disabled 상태 만들기
    setIsDisabled(true)
    setTimeout(() => {
      setIsDisabled(false)
    },1000)
    setIsLoading(false);
  };
  return(
    <C.Container>
      {isLoading?<Loading isLoading={isLoading} setIsLoading={setIsLoading} cancelLoading={cancelLoading} />:''}
      <O.BookContainer> 
        <OpenBookLeft>
          {!isSelectedDalle ? <GrimChoice /> : <DalleChoice />}
        </OpenBookLeft>
        <OpenBookRight>
          <DiaryContent checkSelectedDalle={checkSelectedDalle} getLoading={setIsLoading} startLoading={startLoading} loadingState={loadingState} isDisabled={isDisabled} />
        </OpenBookRight>
        <Bookmark />
      </O.BookContainer>
    </C.Container>
  )
}

export default WriteGrim;

