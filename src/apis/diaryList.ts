import { useQuery } from 'react-query';
import baseAxios from './baseAxios';

// 일기 목록 받아오기
const getDiaryList = async (diaryDate:string) => {
  console.log('일기 저장목록');
  const response = await baseAxios.get(`diaries?diary_date=${diaryDate}`);
  return response.data.data;
};

export const getDiaryListData = (diaryDate: string) => {
  const {isLoading, isSuccess, error, data} = useQuery(
    ["diaryList", diaryDate],
    async () => await getDiaryList(diaryDate),{
      enabled: diaryDate !== '',
      retry:0,
      onSuccess: (data) => {},
      onError: (error) => {}
    }
  );
  return {isLoading, isSuccess, error, data};
}