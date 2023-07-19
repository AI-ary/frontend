import { useState }  from 'react';
import styled from 'styled-components';
import {Button, Container, TextField, makeStyles} from '@material-ui/core';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
<<<<<<< HEAD:src/pages/Auth/SignIn/components/SignInForm.tsx
import { signIn } from '@/apis/auth';
=======
import { useMutation } from 'react-query';
>>>>>>> #14:src/components/account/SignInForm.tsx

const useStyles = makeStyles(theme => ({
  customHoverFocus: {
    '&:hover, &.Mui-focusVisible': { backgroundColor: 'rgb(255, 215, 17)' }
  }
}));

const TypeSignIn = styled.div`
display: flex;
justify-content: center;
align-items: center;
`

const SignInBtn = styled.div`
background-color: rgb(240, 219, 109);
border-radius: 30px;
position: relative;
top:365px;`

const SignUpBtn = styled.div`
position: relative;
top: 8px;
right: 25px;
align-self:flex-end;`

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;`

interface SignInProps {
  email: string,
  password:string
}

interface RefreshProps {
  refresh: string | null,
}

function SignInForm() {
  const navigate = useNavigate();
  const classes = useStyles();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  let isSigning = '로그인'
  let count : number = 0;

  const signin = useMutation((data : SignInProps) => {
    return api.post('auth', data)
  }, {
    onSuccess: (data) => {
      onLoginSuccess(data)
    },
    onError: () => {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: '아이디 혹은 비밀번호를 다시 확인해주세요.',
        showConfirmButton: false,
        timer: 2000
      })
    },
  })

  const refreshing = useMutation((data : RefreshProps) => {
    return api.post('auth/refresh',data)
  },
    {
      onSuccess: () => {
        onLogin()
      },
      onError: (err) => {
        console.log(err)
      }
    }
  )

  function emailValid() {
    var check = /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    return check.test(email);
  }

  function Valid() {
    if(emailValid() && password) {
      return false;
    } else return true;
  }

<<<<<<< HEAD:src/pages/Auth/SignIn/components/SignInForm.tsx
  const {isSignInLoading, isSignInSuccess, isSignInError, mutate } = signIn()
  
  if (isSignInLoading) {
    isSigning = '로그인 중'
=======
  function onSilentRefresh() {
    refreshing.mutate({
      refresh: sessionStorage.getItem('refresh')
    })
>>>>>>> #14:src/components/account/SignInForm.tsx
  }
  if (isSignInError) {
    isSigning = '로그인'
  }
  if (isSignInSuccess) {
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
  }

<<<<<<< HEAD:src/pages/Auth/SignIn/components/SignInForm.tsx
  const onClick = () => {
    mutate({
=======
  function onLogin() {
    signin.mutate({
>>>>>>> #14:src/components/account/SignInForm.tsx
      email: email,
      password: password
    })
  }

  return(
    <Wrap>
      <SignInBtn>
        <Button className={classes.customHoverFocus} type='button' onClick={onClick} disabled={Valid()} 
          style={Valid() ? { color: 'white', backgroundColor: '#F8EDB7', fontWeight: 'bolder', borderRadius: '30px', fontSize: '30px', width: '120px' } : { fontWeight: 'bolder', borderRadius: '30px', fontSize: '30px', width: '120px' }}>
        {isSigning}</Button>
      </SignInBtn>
      <TypeSignIn>
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
      </TypeSignIn>
      <SignUpBtn>
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
      </SignUpBtn>
    </Wrap>
  );
}

export default SignInForm;