import { useQuery } from 'react-query';
import baseAxios from './baseAxios';

// 일기 목록 받아오기
const getDiaryList = async () => {
  const response = await baseAxios.get('/diaries');
  return response.data;
};

export const getDiaryListData = () => {
  const {isLoading, isSuccess, error, data} = useQuery(
    ["diaryList"],
    async () => await getDiaryList(),{
      retry:0,
      onSuccess: (data) => {},
      onError: (error) => {}
    }
  );
  return {isLoading, isSuccess, error, data};
}