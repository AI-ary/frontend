import { useState }  from 'react';
import styled from 'styled-components';
import {Button, Container, TextField, makeStyles} from '@material-ui/core';
import { Link } from 'react-router-dom';
import { signIn } from '@/apis/auth';

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

function SignInForm() {
  const classes = useStyles();
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