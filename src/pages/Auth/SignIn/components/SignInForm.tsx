import { useState }  from 'react';
import * as S from '../../../../styles/auth/auth.style'
import * as C from '../../../../styles/common.style'

function SignInForm() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  let isSigning = '로그인'

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

  const onClick = () => {
    mutate({
      email: email,
      password: password
    })
  }

  return (
    <S.Container>
      <S.InputWrap>
        <S.Input type="text" placeholder="이메일" value={email} onChange={(e)=>setEmail(e.target.value)} isValid={email ? !emailValid() : emailValid()} />
        <S.Input type="password" placeholder="비밀번호" value={password} onChange={(e) => setPassword(e.target.value)} isValid={false} />
      </S.InputWrap>
      <S.BtnWrap>
        <C.CommonFilledBtn disabled={Valid()} isValid={Valid()} onClick={()=>onLogin()}>로그인</C.CommonFilledBtn>
        <C.CommonOutlinedBtn onClick={()=>navigate('/signup')}>회원가입</C.CommonOutlinedBtn>
      </S.BtnWrap>
    </S.Container>
  );
}

export default SignInForm;