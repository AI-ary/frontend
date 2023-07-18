import { useQuery } from 'react-query';
import baseAxios from './baseAxios';

interface SearchDataType{
  search: string | undefined,
  user: string
}

const getSearchList =async ({search, user}:SearchDataType) => {
  const response = await baseAxios.get(`diaries?search=${search}&&user_id=${user}`);
  return response.data;
}

export const getSearchData = ({search, user}:SearchDataType) => {
  const {isLoading, isSuccess, isError, data} = useQuery(
    ["searchList", search],
    async () => await getSearchList({search, user}),
    {
      retry: 0,
      onSuccess: (data)=>{
        if(data.length === 0){
          window.location.href = '/list'; 
          alert('찾으시는 내용은 없습니다.');
        }
      },
      onError: () => {}
    }
  );
  return {isLoading, isSuccess, isError, data};
}