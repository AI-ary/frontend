import { useQuery } from 'react-query';
import baseAxios from './baseAxios';

interface SearchDataType{
  date: string,
  keyword: string | undefined
}

const getSearchList =async ({date, keyword}:SearchDataType) => {
  const response = await baseAxios.get(`diaries/search?diary_date=${date}&keyword=${keyword}`);
  return response.data.data.diary_infos;
}

export const getSearchData = ({date, keyword}:SearchDataType) => {
  const {isLoading, isSuccess, isError, data} = useQuery(
    ["searchList", keyword, date],
    async () => await getSearchList({date, keyword}),
    {
      retry: 0,
      enabled: date !== '',
      onSuccess: ()=>{},
      onError: () => {}
    }
  );
  return {isLoading, isSuccess, isError, data};
}