import { useMutation } from 'react-query';
import aiAxios from './aiAxios';
import { useStore } from '@/store/store';

const configJSON = {
  headers: { 'Content-Type': 'application/json'},
};

// dalle 일기 내용 보내기
const addDalleText = async (content: string) => {
  const response = await aiAxios.post('dalle/', { story: content }, configJSON);
  return response.data.task_id;
};

// dalle 일기 폴링
const sendDallePolling = async (taskId: string) => {
  const response = await aiAxios.post('dalle/status', { task_id: taskId }, configJSON);
  return response.data.status;
};

// dalle 키워드 그림 가져오기
const getDalleDrawing = async (taskId: string) => {
  const response = await aiAxios.post('dalle/result', {task_id: taskId}, configJSON);
  return response.data.image_urls;
}

// Dalle 키워드 전송
export const addDalleTextData = () =>{
  const {setLoading} = useStore()
  const {mutate, data: dalleTaskId, isLoading: isDalleTextLoading, isSuccess: isDalleTextSuccess, isError: isDalleTextError} = useMutation(addDalleText, {
    onError: () => {
      console.log("텍스트 전송 실패");
      setLoading(false)
    },
    onSuccess: () => {
      console.log("텍스트 전송 성공");
    },
  });

  const addDalleTextContent = async (story: string) => {
    mutate(story);
  }
  
  return {isDalleTextLoading, isDalleTextSuccess, isDalleTextError, dalleTaskId, addDalleTextContent};
}

export const sendDallePollingData = () => {
  const {setLoading} = useStore()
  const {mutate, data: dalleState, isSuccess: isDallePollingSuccess, isError: isDallePollingError} = useMutation(sendDallePolling, {
    onError: (e) => {
      console.log("상태 조회 실패");
      console.log(e)
      setLoading(false)
    },
    onSuccess: (res) => {
      console.log("상태 확인");
    },
  });
  const sendDallePollingState = async (taskId: string) => {
    mutate(taskId);
  }

  return {isDallePollingSuccess, isDallePollingError, dalleState, sendDallePollingState};
}

export const getDalledDrawingData = () => {
  const {setLoading} = useStore()
  const {mutate, data: dalleImg, isSuccess: isGetDalleImgSuccess, isError: isGetDalleImgError} = useMutation(getDalleDrawing,{
    onError: (e) => {
      console.log('이미지 가져오기 실패');
      console.log(e);
      setLoading(false)
    },
    onSuccess: (res) => {
      console.log("이미지 가져오기 성공");
      console.log(res);
      setLoading(false)
    }
  });
  const getDalleImg = async (taskId: string) => {
    mutate(taskId);
  }
  return { isGetDalleImgSuccess, isGetDalleImgError, dalleImg, getDalleImg};
}