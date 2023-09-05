import axios from 'axios';

const baseAxios = axios.create({
  baseURL: 'http://localhost:80/api/',
});

// baseAxios.interceptors.request.use(
//   (config) => {
//     const accessToken = sessionStorage.getItem('token');
//     if(accessToken != null){
//       config.headers.access = `Bearer ${accessToken}`;
//     }
//     return config;
//   },
//   async (error) =>{
//     console.log(error);
//     return await Promise.reject(error);
//   }
// );

// baseAxios.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;
//     console.log(error);

//     if(error.response?.status === 401){
//       const refreshToken = sessionStorage.getItem("refresh");
//       if(refreshToken != null){
//         const refreshedAccessToken = await updateAccessToken(refreshToken);

//         if(refreshedAccessToken !== null && refreshedAccessToken!==undefined){
//           originalRequest.headers.access = `Bearer ${
//             refreshedAccessToken as string
//           }`;

//           localStorage.setItem("accessToken", refreshedAccessToken);
//           return await baseAxios(originalRequest);
//         }
//       }
//     }
//     sessionStorage.clear();
//     alert("로그인 정보 만료");
//     window.location.href="/";

//     return await Promise.reject(error);
//   }
// );

// export const updateAccessToken = async (refreshToken: string) => {
//   const response = await baseAxios.post("users/login/refresh/", {
//     refresh: refreshToken,
//   });
//   return response.data.access;
// };


export default baseAxios;