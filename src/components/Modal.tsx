import { useStore } from '@/store/store';
import { CommonFilledBtn, CommonOutlinedBtn } from '@/styles/common.style';
import { ReactNode, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { PiWarningCircleLight, PiCheckCircleLight } from 'react-icons/pi';
import * as S from '../styles/modal.style';

interface Props {
  icon: string;
  version: string;
  title: string | ReactNode;
  content: string;
  onClick: () => void;
}

export default function Modal(props: Props) {
  const [modalIcon, setModalIcon] = useState<any>();
  const {
    setConfirm,
    setSuccess,
    setConfirmLogout,
    setDuplicateEmail,
    setDuplicateNickname,
    setConfirmWeather,
    setConfirmContents,
    setConfirmTitle,
    setLimitWordLength,
    setConfirmDelete,
    setBringGrimWarning,
    setBringMoreDalleWarning,
  } = useStore();
  const setFalse = () => {
    setBringGrimWarning(false);
    setConfirm(false);
    setConfirmDelete(false);
    setLimitWordLength(false);
    setConfirmWeather(false);
    setConfirmTitle(false);
    setConfirmContents(false);
    setSuccess(false);
    setConfirmLogout(false);
    setDuplicateEmail(false);
    setDuplicateNickname(false);
    setBringMoreDalleWarning(false);
  };

  const onClickConfirm = () => {
    setFalse();
    props.onClick();
  };

  const NoButton = () => {
    setTimeout(() => {
      onClickConfirm();
      if (modalIcon) {
        modalIcon.classList.remove('modal_shake');
      }
    }, 3000);

    return <></>;
  };
  const TwoButton = () => {
    return (
      <S.TwoButtonWrap>
        <CommonFilledBtn autoFocus isValid={false} onClick={onClickConfirm}>
          예
        </CommonFilledBtn>
        <CommonOutlinedBtn onClick={setFalse}>아니요</CommonOutlinedBtn>
      </S.TwoButtonWrap>
    );
  };
  useEffect(() => {
    const resetModalIcon = document.querySelector('.modal_icon');
    setModalIcon(resetModalIcon);
    resetModalIcon?.classList.add('modal_shake');
  }, []);
  return createPortal(
    <S.Background onClick={setFalse}>
      <S.Container onClick={(e) => e.stopPropagation()}>
        <S.ContentWrap>
          <S.IconWrap icon={props.icon} className='modal_icon'>
            {props.icon === 'warning' ? (
              <PiWarningCircleLight size={50} />
            ) : (
              <PiCheckCircleLight size={50} />
            )}
          </S.IconWrap>
          <S.Title>{props.title}</S.Title>
          <S.Content>{props.content}</S.Content>
          <S.ButtonWrap>
            {props.version === 'no_btn' ? <NoButton /> : <TwoButton />}
          </S.ButtonWrap>
        </S.ContentWrap>
      </S.Container>
    </S.Background>,
    document.body
  );
}
