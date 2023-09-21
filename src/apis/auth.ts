import { useMutation } from 'react-query';
import baseAxios from './baseAxios';
import { useNavigate } from 'react-router-dom';
import { useStore } from '@/store/store';

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

const onSignIn = (data : SignInProps) => {
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
  const { setConfirm, setSuccess } = useStore();
  const { mutate, isLoading:isSignInLoading, isError: isSignInError } = useMutation(onSignIn, {
    onSuccess: (res: any) => {
      if (count === 0) {
        setSuccess(true)
        navigate('/main')
        count++;
      }
      const access = res.data.data.access_token;
      const refresh = res.data.data.refresh_token;
      sessionStorage.setItem('token', access);
      sessionStorage.setItem('refresh', refresh);
    }, onError: (err) => {
      console.log(err)
      setConfirm(true)
    }
  })
    
  return {isSignInLoading, isSignInError, mutate}
}

export const signUp = () => {
  const navigate = useNavigate();
  const { setSuccess, setDuplicateNickname, setDuplicateEmail } = useStore();
  const { mutate, isLoading: isSignUpLoading, isError: isSignUpError } = useMutation(onSignUp, {
    onSuccess: () => {
      setSuccess(true)
      navigate('/signin')
    },
    onError: (err: any) => {
      if (err.response.data.businessCode === 'U004') {
        setDuplicateEmail(true)
      } else if (err.response.data.businessCode === 'U005') {
        setDuplicateNickname(true)
      }
    }
  })
  return { isSignUpError, isSignUpLoading, mutate}
}


export const updateAccessToken = async (access_token: string, refresh_token: string) => {
  const response = await baseAxios.post("users/reissue", {
    "access_token": accessToken,
    "refresh_token": refreshToken
  });
  console.log(response.data);
  return response.data;
};

export const logout = () => {
  const navigate = useNavigate();
  const {setSuccess} = useStore()
  const { mutate } = useMutation(onLogout, {
    onSuccess: () => {
      setSuccess(true)
      sessionStorage.clear();
      navigate('/')
    },
    onError: (err:any) => {
      console.log(err)
    }
  })
  return { mutate }
}

