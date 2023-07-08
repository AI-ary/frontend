import {useState, useEffect} from 'react';
import {useParams} from 'react-router';
import api from '../../apis/axios'
import * as S from '../../styles/diary/diary.style';
import Bookmark from '../../components/bookshape/Bookmark';
import DiaryList from '../DiaryList/components/DiaryList';

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
  const param = useParams();

  // useEffect(()=>{
  //   // const fetchData = async () => {
  //   //   const result=await api.get(
  //   //     ''+param.word
  //   //   );
  //   //   setSearchList(result.data.result);
  //   // }
  //   // fetchData();

  // },[]);

  useEffect(()=>{
    console.log(param.word)
    fetch('/data/dummy.json')
      .then(res=>res.json())
      .then(res=>{
        console.log(res);
        setSearchList(res);
        setDetail(res[0]);
      });
  },[]);

  return(
    <S.WriteContainer>
      <S.Book2Container> 
        <S.BookShape2Left>
          <div style={{display:'flex', flexDirection:'column'}}>
            {searchList.map((data:any,key:number)=>{
              return(
                <div key={key}>
                  <span style={{margin:'10px'}}>{data.diary_date}</span>
                  <span style={{margin:'10px'}} onClick={()=>setDetail(data)}>{data.title}</span>
                  <span style={{margin:'10px'}}>{data.contents}</span>
                </div>
              )
            })}
          </div>
        </S.BookShape2Left>
        <S.Line />
        <S.BookShape2Right>
          {detail===undefined || detail.id===-1?'':
            <DiaryList key={detail.id} id={detail.id} title={detail.title} weather={detail.weather} draw={detail.drawing_url} contents={detail.contents} date={detail.diary_date} emoji={detail.emoji} />
          }
        </S.BookShape2Right>
        <Bookmark />
      </S.Book2Container>
    </S.WriteContainer>
  )
}

export default DiarySearchList;