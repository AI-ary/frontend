import { useStore } from '@/store/store';
import { CommonFilledBtn, CommonOutlinedBtn } from '@/styles/common.style';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { PiWarningCircleLight, PiCheckCircleLight} from 'react-icons/pi';
import * as S from '../styles/modal.style'

interface Props {
    icon: string;
    version: string;
    title: string;
    content: string;
    onClick: ()=>void
}

export default function Modal(props: Props) {
  const [modalIcon, setModalIcon] = useState<any>()
  const { setNicknameError, setSuccess, setConfirm, setDuplicateEmail, setDuplicateNickname} = useStore()
  const setFalse = () => {
    setNicknameError(false)
    setSuccess(false)
    setConfirm(false)
    setDuplicateEmail(false)
    setDuplicateNickname(false)
  }
    
  const OneButton = () => {
    return (<CommonFilledBtn autoFocus isValid={false} onClick={() => {
      setFalse()
      if (modalIcon) {
        modalIcon.classList.remove('modal_shake')
      }
    }}>확인</CommonFilledBtn>)
  }
  const TwoButton = () => {
    return (
      <S.TwoButtonWrap>
        <CommonFilledBtn autoFocus isValid={false} onClick={props.onClick}>예</CommonFilledBtn>
        <CommonOutlinedBtn onClick={setFalse}>아니요</CommonOutlinedBtn>
      </S.TwoButtonWrap>
    )
  }
  useEffect(() => {
    const resetModalIcon = document.querySelector('.modal_icon')
    setModalIcon(resetModalIcon)
    resetModalIcon?.classList.add('modal_shake')
  },[])
  return createPortal(
    <S.Background onClick={setFalse}>
      <S.Container onClick={(e)=>e.stopPropagation()}>
        <S.ContentWrap>
          <S.IconWrap icon={props.icon} className='modal_icon'>{props.icon === 'warning' ? <PiWarningCircleLight size={50}/> : <PiCheckCircleLight size={50}/>}</S.IconWrap>
          <>{props.title}</>
          <>{props.content}</>
          <S.ButtonWrap>{props.version === 'one_btn' ? <OneButton/> : <TwoButton/>}</S.ButtonWrap>
        </S.ContentWrap>
      </S.Container>
    </S.Background>,
    document.body
  );
}