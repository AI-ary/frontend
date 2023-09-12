import { useQuery, useMutation, useQueryClient } from 'react-query';
import { useState, useEffect } from 'react';
import baseAxios from './baseAxios';
import aiAxios from './aiAxios';
import Swal from 'sweetalert2';

// form 데이터 형식
const config = {
  headers: { 'Content-Type': 'multipart/form-data'},
};
const configJSON = {
  headers: { 'Content-Type': 'application/json'},
};

// 일기 내용 보내기
const addText = async (content: string) => {
  const response = await aiAxios.post('konlpy/', { story: content }, configJSON);
  return response.data.task_id;
};

// 일기 폴링
const sendPolling = async (taskId: string) => {
  const response = await aiAxios.post('konlpy/status', { task_id: taskId }, configJSON);
  return response.data.status;
};

// 키워드 그림 가져오기
const getKeywordDrawing = async (taskId: string) => {
  const response = await aiAxios.post('konlpy/result', {task_id: taskId}, configJSON);
  return response.data;
}

// 일기 저장 보내기
const addDiary = async (formData: FormData) => {
  await baseAxios.post('diaries', formData, config);
}

export const addTextData = () =>{
  const {mutate, data: taskId, isLoading: isTextLoading, isSuccess: isTextSuccess, isError: isTextError} = useMutation(addText, {
    onError: () => {
      console.log("텍스트 전송 실패");
    },
    onSuccess: () => {
      console.log("텍스트 전송 성공");
    },
  });

  const addTextContent = async (story: string) => {
    mutate(story);
  }
  
  return {isTextLoading, isTextSuccess, isTextError, taskId, addTextContent};
}

export const sendPollingData = () => {
  const {mutate, data: state, isSuccess: isPollingSuccess, isError: isPllingError} = useMutation(sendPolling, {
    onError: (e) => {
      console.log("상태 조회 실패");
      console.log(e)
    },
    onSuccess: (res) => {
      console.log("상태 확인");
    },
  });
  const sendPollingState = async (taskId: string) => {
    mutate(taskId);
  }

  return {isPollingSuccess, isPllingError, state, sendPollingState};
}

export const getKeywordDrawingData = () => {
  const {mutate, data: keyword_img, isSuccess: isGetImgSuccess, isError: isGetImgError} = useMutation(getKeywordDrawing,{
    onError: (e) => {
      console.log('이미지 가져오기 실패');
      console.log(e);
    },
    onSuccess: (res) => {
      console.log("이미지 가져오기 성공");
      console.log(res);
    }
  });
  const getKeywordImg = async (taskId: string) => {
    mutate(taskId);
  }
  return { isGetImgSuccess, isGetImgError, keyword_img, getKeywordImg};
}

// onSuccess: (data) => {
//   if(data.result.length===0){
//     Swal.fire({
//       position: 'center',
//       icon: 'warning',
//       title: '키워드에 맞는 이미지가 없습니다.',
//       showConfirmButton: false,
//       timer: 2000
//     });
//   }
// },
// onError: () =>{
// }
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