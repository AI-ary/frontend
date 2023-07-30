import React, { useState } from 'react';
import Swal from 'sweetalert2';
import * as S from '../../../../styles/auth/auth.style'
import * as C from '../../../../styles/common.style'
import { signUp } from '@/apis/auth';


export const Warning = ({content, valid} : {content : string, valid:boolean}) => {
  return(
    <div className='h-5 flex items-center'>
      <span className={valid ? 'text-red-600 mx-1' : 'hidden'}>{content}</span>
    </div>)
}

function SignUpForm() {
  const [nickname, setNickname] = useState <string>('');
  const [email, setEmail] = useState < string > ('');
  const [password, setPassword] = useState < string > ('');
  const [confirm, setConfirm] = useState<string>('');
  const { isSignUpError, isSignUpLoading, mutate} = signUp()
  let isMaking = '계정 생성'

  if (isSignUpLoading) {
    isMaking = '계정 생성 중'
  }
  if (isSignUpError) {
    isMaking = '계정 생성'
  }

  function nameInput(e: React.ChangeEvent<HTMLInputElement>) {
    setNickname(e.target.value);
    if (nickname.length > 10) {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: '10글자 이하로 작성해 주세요.',
        showConfirmButton: false,
        timer: 2000,
      });
      setNickname((name) => name.substring(0, 10));
    }
  }

  function nicknameValid() {
    var check = /[~!@#$%^&*()+|<>?:{}ㄱ-ㅎㅏ-ㅣ]/;
    return check.test(nickname);
  }

  function emailValid() {
    var check = /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    return check.test(email);
  }

  function passwordValid() {
    var check = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
    return check.test(password);
  }

  function isSame() {
    if (confirm === password) return true;
    else return false;
  }

  function onClick(e: React.MouseEvent) {
    mutate({
      nickname: nickname,
      email: email,
      password: password
    })
  }

  function Valid() {
    if ((nickname ? true : false) && nickname.length >= 2 && !nicknameValid() && emailValid() && passwordValid() && isSame()) {
      return false;
    } else return true;
  }

  return (
    <S.Container>
      <S.InputWrap>
        <S.Input type="text" placeholder="닉네임" value={nickname} onChange={nameInput} isValid={nicknameValid()} />
        <Warning content={'특수문자 혹은 모음, 자음은 사용하실 수 없습니다.'} valid={nicknameValid()} />
        <S.Input type="text" placeholder="이메일" value={email} onChange={(e)=>setEmail(e.target.value)} isValid={email ? !emailValid() : emailValid()} />
        <Warning content={'이메일 형식으로 입력해 주세요.'} valid={email ? !emailValid() : emailValid()} />
        <S.Input type="password" placeholder="비밀번호" value={password} onChange={(e) => setPassword(e.target.value)} isValid={password ? !passwordValid() : passwordValid()} />
        <Warning content={'숫자, 특수문자를 포함하여 8글자 이상 입력해 주세요.'} valid={password ? !passwordValid() : passwordValid()} />
        <S.Input type="password" placeholder="비밀번호 확인" value={confirm} onChange={(e)=>setConfirm(e.target.value)} isValid={confirm ? (!confirm ? isSame() : !isSame()) : false} />
        <Warning content={'비밀번호를 다시 확인해 주세요.'} valid={confirm ? (!confirm ? isSame() : !isSame()) : false} />
      </S.InputWrap>
      <C.CommonFilledBtn disabled={Valid()} isValid={Valid()} onClick={onClick} >계정 생성</C.CommonFilledBtn>
    </S.Container>
  );
}

export default SignUpForm;
