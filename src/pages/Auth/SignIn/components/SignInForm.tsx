import { useState }  from 'react';
import * as S from '../../../../styles/auth/auth.style'
import * as C from '../../../../styles/common.style'
import { signIn } from '@/apis/auth';
import { useNavigate } from 'react-router-dom';
import Modal from '@/components/Modal';
import { useStore } from '@/store/store';
import { IoMdEye, IoMdEyeOff } from "react-icons/io";

function SignInForm() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const {confirm, success} = useStore()
  let isSigning = '로그인'
  const navigate = useNavigate()

  function emailValid() {
    var check = /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    return check.test(email);
  }

  function Valid() {
    if(emailValid() && password) {
      return false;
    } else return true;
  }

  const {isSignInLoading, isSignInError, mutate } = signIn()
  
  if (isSignInLoading) {
    isSigning = '로그인 중'
  }
  if (isSignInError) {
    isSigning = '로그인'
  }

  const onLogin = (e: React.MouseEvent | React.KeyboardEvent) => {
      if (!Valid() && ((e as React.KeyboardEvent)?.key === 'Enter' || (e as React.MouseEvent)?.type === 'click')) {
      mutate({
        email: email,
        password: password
      })
    }
  }

  return (
    <S.Container>
      <S.InputWrap>
        <S.Input type="text" placeholder="이메일" value={email} onChange={(e)=>setEmail(e.target.value)} isValid={email ? !emailValid() : emailValid()} />
        <S.WarningWrap>
          <S.WarningContent valid={email ? !emailValid() : emailValid()}>이메일 형식으로 입력해 주세요.</S.WarningContent>
        </S.WarningWrap>
        <S.PasswordInputWrap>
          <S.Input type={!isVisible ? "password" : "text"} placeholder="비밀번호" value={password} onChange={(e) => setPassword(e.target.value)} isValid={false} onKeyDown={onLogin} />
          <S.ToggleVisibleButton onClick={()=>setIsVisible(!isVisible)}>
            {!isVisible ? <IoMdEyeOff /> : <IoMdEye />} 
          </S.ToggleVisibleButton>
        </S.PasswordInputWrap>
      </S.InputWrap>
      <S.BtnWrap>
        <C.CommonFilledBtn disabled={Valid()} isValid={Valid()} onClick={onLogin}>로그인</C.CommonFilledBtn>
        <C.CommonEmptyBtn onClick={()=>navigate('/signup')} isValid={false}>회원가입</C.CommonEmptyBtn>
      </S.BtnWrap>
      {confirm && <Modal onClick={()=>{}} icon='warning' version='no_btn' title="아이디 혹은 비밀번호를 다시 확인해주세요." content="" />}
      {success && <Modal onClick={()=>{}} icon='success' version='no_btn' title="로그인 성공!" content="" />}
    </S.Container>
  );
}

export default SignInForm;