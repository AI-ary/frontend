import React,{useState} from 'react';

function DiarySearch(){
  const [search, setSearch]=useState<string>('');

  const onChange = (e: React.ChangeEvent<HTMLInputElement>)=>{
    setSearch(e.target.value);
  }

  const handleSearch = async () =>{
    window.location.href = '/search/'+search; 
  }

  const handleEnter = (e:React.KeyboardEvent<HTMLInputElement>) =>{
    if(e.key == 'Enter'){
      handleSearch();
    }
  };

  return(
    <div style={{padding: '20px 20px 0px 20px', display:'flex', justifyContent:'flex-end'}}>
      <input type="text" value={search} placeholder={search} onChange={onChange} onKeyDown={(e)=>handleEnter(e)} style={{marginRight:'5px'}} />
      <button onClick={handleSearch}>검색</button>
    </div>
  )
}

export default DiarySearch;