import { useMutation } from 'react-query';
import baseAxios from './baseAxios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

interface SignUpProps {
  nickname: string,
  email: string,
  password:string
}

interface SignInProps {
  email: string,
  password:string
}

interface RefreshProps {
  refresh: string | null,
}

const JWT_EXPIRY_TIME = 1800 * 1000 // 만료시간 30분 (밀리초로 표현)
let temp : SignInProps;

const onSignIn = (data : SignInProps) => {
  temp = data
  return baseAxios.post('auth', data)
}

const onRefreshing = (data : RefreshProps) => {
  return baseAxios.post('auth/refresh',data)
}

const onSignUp = (data: SignUpProps) => {
  return baseAxios.post('join', data)
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
      const access = res.data.token.access;
      const refresh = res.data.token.refresh;
      setTimeout(onSilentRefresh, JWT_EXPIRY_TIME - 60000);
      baseAxios.defaults.headers.common['Authorization'] = `Bearer ${access}`
      sessionStorage.setItem('token', access);
      sessionStorage.setItem('refresh', refresh);
      sessionStorage.setItem('nickname', `${res.data.user.nickname}`)
      sessionStorage.setItem('id', `${res.data.user.id}`)
    }, onError: (err) => {
      console.log(err)
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: '아이디 혹은 비밀번호를 다시 확인해주세요.',
        showConfirmButton: false,
        timer: 2000
      })
    }
  })
  const onSilentRefresh = () => {
    refreshing.mutate({refresh: sessionStorage.getItem('refresh')})
  }
  const refreshing = useMutation(onRefreshing,
    {
      onSuccess: () => {
        mutate(temp)
      },
      onError: (err) => {
        console.log(err)
      }
    }
  )
    
  return {isSignInLoading, isSignInError, mutate}
}

export const signUp = () => {
  const { mutate, isLoading: isSignUpLoading, isSuccess: isSignUpSuccess, isError: isSignUpError } = useMutation(onSignUp, {
    onSuccess: () => {
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: '회원가입 성공!',
        showConfirmButton: false,
        timer: 2000,
      });
    },
    onError: (err:any) => {
      if (err.response.data.email) {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: `${err.response.data.email}`,
          showConfirmButton: false,
          timer: 2000,
        });
      } else if (err.response.data.nickname) {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: `${err.response.data.nickname}`,
          showConfirmButton: false,
          timer: 2000,
        });
      }
    }
  })
  return { isSignUpError, isSignUpLoading, isSignUpSuccess, mutate}
}