import React, { useState } from 'react';
import Swal from 'sweetalert2';
import * as S from '../../../../styles/auth/auth.style'
import * as C from '../../../../styles/common.style'
import { signUp } from '@/apis/auth';

interface SignUpProps {
  nickname: string,
  email: string,
  password:string
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

  const btnStyle = {
    fontWeight: 'bolder',
    borderRadius: '30px',
    fontSize: '30px',
    color: !Valid() ? '' : 'white',
    backgroundColor: !Valid() ? '' : '#F8EDB7',
  };

  return (
    <S.Container>
      <S.InputWrap>
        <S.Input type="text" placeholder="닉네임" value={nickname} onChange={nameInput} isValid={nicknameValid()} />
        <S.Input type="text" placeholder="이메일" value={email} onChange={(e)=>setEmail(e.target.value)} isValid={email ? !emailValid() : emailValid()} />
        <S.Input type="password" placeholder="비밀번호" value={password} onChange={(e)=>setPassword(e.target.value)} isValid={password ? !passwordValid() : passwordValid()} />
        <S.Input type="password" placeholder="비밀번호 확인" value={confirm} onChange={(e)=>setConfirm(e.target.value)} isValid={confirm ? (!confirm ? isSame() : !isSame()) : false} />
      </S.InputWrap>
      <C.CommonFilledBtn disabled={Valid()} isValid={Valid()} onClick={onClick} >계정 생성</C.CommonFilledBtn>
    </S.Container>
  );
}

export default SignUpForm;
