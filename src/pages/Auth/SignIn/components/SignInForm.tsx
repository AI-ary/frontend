import { useState }  from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../../../apis/baseAxios'
import { AxiosResponse } from 'axios';
import Swal from 'sweetalert2';
import * as S from '../../../../styles/auth/auth.style'
import * as C from '../../../../styles/common.style'

function SignInForm() {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>('');
  const [password,setPassword] = useState<string>('');
  const JWT_EXPIRY_TIME = 1800 * 1000 // 만료시간 30분 (밀리초로 표현)
  let count : number = 0;

  function emailValid() {
    var check = /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    return check.test(email);
  }

  function Valid() {
    if(emailValid() && password) {
      return false;
    } else return true;
  }

  function onSilentRefresh() {
    api.post('auth/refresh', {
      refresh: sessionStorage.getItem('refresh')
    }).then(onLogin).catch(function (err) {
      console.log(err)
    })
  }

  function onLoginSuccess(res : AxiosResponse) {
    const access = res.data.token.access;
    const refresh = res.data.token.refresh;
    if (count === 0) {  
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: '로그인 성공!',
        showConfirmButton: false,
        timer: 2000
      })
      navigate('/main')
      count++;
    }
    setTimeout(onSilentRefresh, JWT_EXPIRY_TIME - 60000);
    api.defaults.headers.common['Authorization'] = `Bearer ${access}`
    sessionStorage.setItem('token', access);
    sessionStorage.setItem('refresh', refresh);
    sessionStorage.setItem('nickname', `${res.data.user.nickname}`)
    sessionStorage.setItem('id', `${res.data.user.id}`)
  }

  function onLogin() {
    api.post('auth', {
      email: `${email}`,
      password: `${password}`
    }).then(onLoginSuccess).catch(function (res) {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: '아이디 혹은 비밀번호를 다시 확인해주세요.',
        showConfirmButton: false,
        timer: 2000
      })
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