import { useMutation, useQueryClient } from 'react-query';
import baseAxios from './baseAxios';
import Swal from 'sweetalert2';
import { useStore } from '@/store/store';

// form 데이터 형식
const config = {
  headers: { 'Content-Type': 'multipart/form-data'},
};

const addDiary = async (formData: FormData) => {
  await baseAxios.post('diaries', formData, config);
}

export const addDiaryData = () => {
  const queryClient = useQueryClient();
  const {setConfirmWeather, setConfirmContents, setConfirmTitle} = useStore()
  const {mutate, isLoading: isSaveLoading, isSuccess: isSaveSuccess, isError: isSaveError} = useMutation(addDiary, {
    onError: (error:any) => {
      if(error.response.data.errors[0].field === 'title'){
        setConfirmTitle(true)
      } else if(error.response.data.errors[0].field === 'contents'){
        setConfirmContents(true)
      } else if(error.response.data.errors[0].field === 'weather'){
        setConfirmWeather(true)
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