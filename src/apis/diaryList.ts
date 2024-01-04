import { useMutation, useQuery } from 'react-query';
import baseAxios from './baseAxios';
import { useCallback } from 'react';

// 일기 목록 받아오기
const getDiaryList = async (diaryDate:string) => {
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

// 일기 삭제
const deleteDiary = async (diary_id: number) => {
  const response = await baseAxios.delete(`diaries/${diary_id}`);
  return response.data;
};

export const deleteDiaryData = () => {
  const {mutate, isLoading: isDeleteLoading, data: result, isSuccess: isDeleteSuccess, isError} = useMutation(deleteDiary,{
    onError: (error) => {
      console.log(error);
    },
    onSuccess: (data) => {
    }
  });
  const deleteDiaryList = useCallback(
    (diary_id: number) => {
      mutate(diary_id);
    }, [mutate]
  );
  return {isDeleteLoading, result, isDeleteSuccess, isError, deleteDiaryList};
}