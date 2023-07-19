import { useMutation } from 'react-query';
import baseAxios from './baseAxios';
import Swal from 'sweetalert2';

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

export const signIn = () => {
    const { mutate, isLoading:isSignInLoading, isSuccess: isSignInSuccess, isError: isSignInError } = useMutation((data : SignInProps) => {
        temp = data
        return baseAxios.post('auth', data)
    }, {
        onSuccess: (res: any) => {
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
    const refreshing = useMutation((data : RefreshProps) => {
        return baseAxios.post('auth/refresh',data)
    },
        {
        onSuccess: () => {
            mutate(temp)
        },
        onError: (err) => {
            console.log(err)
        }
        }
    )
    
    return {isSignInSuccess, isSignInLoading, isSignInError, mutate}
}

export const signUp = () => {
    const { mutate, isLoading: isSignUpLoading, isSuccess: isSignUpSuccess, isError: isSignUpError } = useMutation((data: SignUpProps) => {
        return baseAxios.post('join', data)
    }, {
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