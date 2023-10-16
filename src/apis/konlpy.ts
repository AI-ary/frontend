import { useMutation } from 'react-query';
import aiAxios from './aiAxios';
import { useStore } from '@/store/store';

const configJSON = {
  headers: { 'Content-Type': 'application/json'},
};

// konlpy 일기 내용 보내기
const addKonlpyText = async (content: string) => {
  const response = await aiAxios.post('konlpy/', { story: content }, configJSON);
  return response.data.task_id;
};

// konlpy 일기 폴링
const sendKonlpyPolling = async (taskId: string) => {
  const response = await aiAxios.post('konlpy/status', { task_id: taskId }, configJSON);
  return response.data.status;
};

// konlpy 키워드 그림 가져오기
const getKonlpyDrawing = async (taskId: string) => {
  const response = await aiAxios.post('konlpy/result', {task_id: taskId}, configJSON);
  return response.data;
}

export const addKonlpyTextData = () => {
  const {setLoading} = useStore()
  const {mutate, data: konlpyTaskId, isLoading: isKonlpyTextLoading, isSuccess: isKonlpyTextSuccess, isError: isKonlpyTextError} = useMutation(addKonlpyText, {
    onError: () => {
      console.log("텍스트 전송 실패");
      setLoading(false)
    },
    onSuccess: () => {
      console.log("텍스트 전송 성공");
    },
  });

  const addKonlpyTextContent = async (story: string) => {
    mutate(story);
  }
  
  return {isKonlpyTextLoading, isKonlpyTextSuccess, isKonlpyTextError, konlpyTaskId, addKonlpyTextContent};
}

export const sendKonlpyPollingData = () => {
  const {setLoading} = useStore()
  const {mutate, data: konlpyState, isSuccess: isKonlpyPollingSuccess, isError: isKonlpyPollingError} = useMutation(sendKonlpyPolling, {
    onError: (e) => {
      console.log("상태 조회 실패");
      console.log(e)
      setLoading(false)
    },
    onSuccess: (res) => {
      console.log(res)
      console.log("상태 확인");
    },
  });
  const sendKonlpyPollingState = async (taskId: string) => {
    mutate(taskId);
  }

  return {isKonlpyPollingSuccess, isKonlpyPollingError, konlpyState, sendKonlpyPollingState};
}

export const getKonlpyDrawingData = () => {
  const {setLoading} = useStore()
  const {mutate, data: konlpyImg, isSuccess: isGetKonlpyImgSuccess, isError: isGetKonlpyImgError} = useMutation(getKonlpyDrawing,{
    onError: (e) => {
      console.log('이미지 가져오기 실패');
      console.log(e);
      setLoading(false)
    },
    onSuccess: (res) => {
      console.log("이미지 가져오기 성공");
      setLoading(false)
    }
  });
  const getKonlpyImg = async (taskId: string) => {
    mutate(taskId);
  }
  return { isGetKonlpyImgSuccess, isGetKonlpyImgError, konlpyImg, getKonlpyImg};
}