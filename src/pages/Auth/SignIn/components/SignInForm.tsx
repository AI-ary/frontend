import { useState }  from 'react';
import {Button, Container, TextField, makeStyles} from '@material-ui/core';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../../../apis/axios'
import { AxiosResponse } from 'axios';
import Swal from 'sweetalert2';
import * as S from '../../../../styles/auth/signin.style'
import * as C from '../../../../styles/auth/common/common.style'

const useStyles = makeStyles(theme => ({
  customHoverFocus: {
    '&:hover, &.Mui-focusVisible': { backgroundColor: 'rgb(255, 215, 17)' }
  }
}));

function SignInForm() {
  const navigate = useNavigate();
  const classes = useStyles();
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

  return(
    <C.Wrap>
      <S.SignInBtn>
        <Button className={classes.customHoverFocus} type='button' onClick={onLogin} disabled={Valid()} 
          style={Valid() ? { color: 'white', backgroundColor: '#F8EDB7', fontWeight: 'bolder', borderRadius: '30px', fontSize: '30px', width: '120px' } : { fontWeight: 'bolder', borderRadius: '30px', fontSize: '30px', width: '120px' }}>
        로그인</Button>
      </S.SignInBtn>
      <S.TypeSignIn>
        <Container maxWidth='sm'>
          <TextField
            margin='dense'
            fullWidth
            variant="filled"
            required
            label="이메일"
            name="email"
            autoComplete="email"
            autoFocus
            type='text'
            value={email}
            onChange={(e) => {
              setEmail(e.target.value)
            }}
            error={email ? !emailValid() : emailValid()}
            helperText={
              email ? (!emailValid() ? '이메일 형식으로 입력해 주세요.' : '') : ''
            }
          />
          <TextField
            margin='dense'
            fullWidth
            variant="filled"
            required
            type="password"
            label="비밀번호"
            name="Password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value)
            }}
          />
        </Container>
      </S.TypeSignIn>
      <S.SignUpBtn>
        <Button style={{
          border: 'solid 2px lightgray', 
          borderRadius: '30px', 
          fontWeight: 'bolder',
          fontSize: '20px'
        }}>
          <Link to='/signup' style={{
            color: 'black', 
            textDecorationLine: 'none'
          }}>회원가입→</Link>
        </Button>
      </S.SignUpBtn>
    </C.Wrap>
  );
}

export default SignInForm;