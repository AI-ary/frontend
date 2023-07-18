import { useQuery, useMutation, useQueryClient } from 'react-query';
import baseAxios from './baseAxios';
import Swal from 'sweetalert2';

interface KeywordDataType{
  send: boolean;
  date: string;
  user: string;
  comContent: string;
}

// form 데이터 형식
const config = {
  headers: { 'Content-Type': 'multipart/form-data'},
};

// 일기 내용 보내기
const addText = async (formData: FormData) => {
  console.log('일기 내용');
  await baseAxios.post('text/', formData, config);
};

// 일기 저장 보내기
const addDiary = async (formData: FormData) => {
  console.log('일기 저장');
  await baseAxios.post('diaries/', formData, config);
}

// 일기 이미지 보내기
const addDiaryImg = async (formData: FormData) => {
  console.log('이미지 전송');
  await baseAxios.post('images/upload', formData, config);
}

// 키워드 그림 가져오기
const getKeywordDrawing = async ({date, user}:KeywordDataType) => {
  console.log('그림');
  const response = await baseAxios.get(`results?diary_date=${date}&&user_id=${user}`);
  return response.data;
}

export const addTextData = () =>{
  const {mutate, isLoading: isTextLoading, isSuccess: isTextSuccess, isError} = useMutation(addText, {
    onError: () => {
      console.log("텍스트 전송 실패");
    },
    onSuccess: () => {
      console.log("텍스트 전송 성공");
    },
  });

  const addTextContent = async (formData: FormData) => {
    mutate(formData);
  }
  return {isTextLoading, isTextSuccess, isError, addTextContent};
}

export const getKeywordDrawingData = ({send, date, user, comContent}:KeywordDataType) => {
  const {isLoading: isKeywordLoading, isSuccess: isKeywordSuccess, isError, data} = useQuery(
    ["keywordDrawingList", comContent],
    async () => await getKeywordDrawing({send, date, user, comContent}),
    {
      retry: 0,
      enabled: !!send,
      onSuccess: (data) => {
        console.log('키워드 그림 추출 성공');
        if(data.result.length===0){
          Swal.fire({
            position: 'center',
            icon: 'warning',
            title: '키워드에 맞는 이미지가 없습니다.',
            showConfirmButton: false,
            timer: 2000
          });
        }
      },
      onError: () =>{
        Swal.fire({
          position: 'center',
          icon: 'warning',
          title: '키워드에 맞는 이미지가 없습니다.',
          showConfirmButton: false,
          timer: 2000
        })
      }
    }
  );
  return {isKeywordLoading, isKeywordSuccess, isError, data};
}

export const addDiaryData = () => {
  const queryClient = useQueryClient();
  const {mutate, isLoading: isSaveLoading, isSuccess: isSaveSuccess, isError: isSaveError} = useMutation(addDiary, {
    onError: (error:any) => {
      console.log('일기 저장 실패');
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
      console.log('일기 저장 성공');
      queryClient.invalidateQueries('diaryList')
    },
  });

  const addDiaryContent =async (formData:FormData) => {
    mutate(formData);
  }
  return {isSaveLoading, isSaveSuccess, isSaveError, addDiaryContent};
}

export const addDiaryImage = () => {
  const {mutate, isLoading: isImgLoading, isSuccess: isImgSuccess, isError} = useMutation(addDiaryImg, {
    onError: () => {
      console.log('일기 이미지 전송 실패');
    },
    onSuccess: () => {
      console.log("일기 이미지 전송 성공");
    },
  });
  const addDiaryImgData = async (formData: FormData) => {
    mutate(formData);
  }

  return {isImgLoading, isImgSuccess, isError, addDiaryImgData};
}