import {useState, useEffect} from 'react';
import {useParams} from 'react-router';
import { Book2Container, WriteContainer } from '../WriteDiary/WriteGrimPage'
import BookShape2L from '../../components/bookshape/OpenBookLeft';
import BookShape2R from '../../components/bookshape/OpenBookRight';
import Bookmark from '../../components/bookshape/Bookmark';
import DiaryList from '../DiaryList/components/DiaryList'
import { getSearchData } from '@/apis/searchDiary';

function DiarySearchList(){
  const [searchList, setSearchList] = useState<any>([]);
  const [detail, setDetail]=useState({
    id:-1,
    title:'',
    weather:-1,
    drawing_url:'',
    contents:'',
    diary_date:'',
    emoji:''
  });
  const user = sessionStorage.getItem('id') || ''; //user id받아오기
  const param = useParams();
  const search = param.word;

  const {isLoading, isSuccess, data} = getSearchData({search, user});

  useEffect(()=>{
    if(isSuccess){
      setSearchList(data);
      setDetail(data[0]);
    }
  },[isSuccess, isLoading, data]);

  return(
    <WriteContainer>
      <Book2Container style={{paddingBottom:'80px'}}> 
        <BookShape2L>
          <div style={{display:'flex', flexDirection:'column'}}>
            {searchList.map((data:any,key:number)=>{
              return(
                <div style={{display: 'flex'}} key={key}>
                  <div style={{margin:'10px'}}>{data.diary_date}</div>
                  <div style={{margin:'10px', cursor: 'pointer'}} onClick={()=>setDetail(data)}>
                    {
                      data.title.includes(search) ? (
                        <>
                          {data.title.split(search)[0]}
                          <span style={{fontWeight: '800', color:'rgb(220, 153, 67'}}>{search}</span>
                          {data.title.split(search)[1]}
                        </>            
                      ):(
                        <span>{data.title}</span>
                      )
                    }
                  </div>
                  <div style={{margin:'10px', width: '350px', overflow: 'hidden', whiteSpace:'nowrap', textOverflow: 'ellipsis'}}>
                    {
                      data.contents.includes(search) ? (
                        <>
                          {data.contents.split(search)[0]}
                          <span style={{fontWeight: '800', color:'rgb(220, 153, 67'}}>{search}</span>
                          {data.contents.split(search)[1]}
                        </>
                      ):(
                        <span>{data.contents}</span>
                      )
                    }
                  </div>
                </div>
              )
            })}
          </div>
        </BookShape2L>
        <BookShape2R>
          {detail===undefined || detail.id===-1?'':
            <DiaryList key={detail.id} id={detail.id} title={detail.title} weather={detail.weather} draw={detail.drawing_url} contents={detail.contents} date={detail.diary_date} emoji={detail.emoji} />
          }
        </BookShape2R>
        <Bookmark />
      </Book2Container>
    </WriteContainer>
  )
}

export default DiarySearchList;