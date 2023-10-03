import { useMutation } from 'react-query';
import baseAxios from './baseAxios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const configJSON = {
  headers: { 'Content-Type': 'application/json'},
};

interface SignUpProps {
  nickname: string,
  email: string,
  password:string
}

interface SignInProps {
  email: string,
  password:string
}

interface LogoutProps {
  access_token: string | null;
  refresh_token: string | null;
}

let temp : SignInProps;

const onSignIn = (data : SignInProps) => {
  temp = data
  return baseAxios.post('users/login', data)
}

const onSignUp = (data: SignUpProps) => {
  return baseAxios.post('users/join', data)
}

const onLogout = (data: LogoutProps) => {
  return baseAxios.post('users/logout', data)
}

let count = 0;

export const signIn = () => {
  const navigate = useNavigate();
  const { mutate, isLoading:isSignInLoading, isError: isSignInError } = useMutation(onSignIn, {
    onSuccess: (res: any) => {
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
      const access = res.data.data.access_token;
      const refresh = res.data.data.refresh_token;
      sessionStorage.setItem('token', access);
      sessionStorage.setItem('refresh', refresh);
    }, onError: (err) => {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: '아이디 혹은 비밀번호를 다시 확인해주세요.',
        showConfirmButton: true,
        // timer: 2000
      })
    }
  })
    
  return {isSignInLoading, isSignInError, mutate}
}

export const signUp = () => {
  const navigate = useNavigate();
  const { mutate, isLoading: isSignUpLoading, isError: isSignUpError } = useMutation(onSignUp, {
    onSuccess: () => {
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: '회원가입 성공!',
        showConfirmButton: false,
        timer: 2000,
      });
      navigate('/signin')
    },
    onError: (err:any) => {
      if (err.response.data.businessCode === 'U004') {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: '이미 존재하는 이메일 입니다.',
          showConfirmButton: false,
          timer: 2000,
        });
      } else if (err.response.data.businessCode === 'U005') {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: '이미 존재하는 닉네임 입니다.',
          showConfirmButton: false,
          timer: 2000,
        });
      }
    }
  })
  return { isSignUpError, isSignUpLoading, mutate}
}

export const updateAccessToken = async (accessToken: string, refreshToken: string) => {
  const response = await baseAxios.post("users/reissue", {
    "access_token": access_token,
    "refresh_token": refresh_token
  });
  console.log(response.data);
  return response.data;
};

export const logout = () => {
  const navigate = useNavigate();
  const { mutate } = useMutation(onLogout, {
    onSuccess: () => {
      Swal.fire(
        '로그아웃 성공!',
        '',
        'success'
      )
      sessionStorage.clear();
      navigate('/')
    },
    onError: (err:any) => {
      console.log(err)
    }
  })
  return { mutate }
}

