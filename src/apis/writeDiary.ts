import { useMutation, useQueryClient } from 'react-query';
import baseAxios from './baseAxios';
import Swal from 'sweetalert2';

// form 데이터 형식
const config = {
  headers: { 'Content-Type': 'multipart/form-data'},
};

const addDiary = async (formData: FormData) => {
  await baseAxios.post('diaries', formData, config);
}

export const addDiaryData = () => {
  const queryClient = useQueryClient();
  const {mutate, isLoading: isSaveLoading, isSuccess: isSaveSuccess, isError: isSaveError} = useMutation(addDiary, {
    onError: (error:any) => {
      if(error.response.data.title){
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: '제목을 입력해 주세요.',
          showConfirmButton: false,
          timer: 2000,
        });
      } else if(error.response.data.contents){
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: '내용을 입력해 주세요.',
          showConfirmButton: false,
          timer: 2000,
        });
      } else if(error.response.data.weather){
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: '날씨를 선택해 주세요.',
          showConfirmButton: false,
          timer: 2000,
        });
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries('diaryList')
    },
  });

  const addDiaryContent =async (formData:FormData) => {
    mutate(formData);
  }
  return {isSaveLoading, isSaveSuccess, isSaveError, addDiaryContent};
}