import {useEffect, useState} from 'react';
import * as D from '../../../styles/diary/diary.style';
import * as DW from '../../../styles/diary/diarywrite.style';
import { useStore } from '@/store/store';

/* 원고지 틀 컴포넌트 */
function Manuscript(props:any) {
  const [word, setWord] = useState<string>('');
  const {setLimitWordLength} = useStore()
  let tr:number[] = Array.apply(null, new Array(5)).map(Number.prototype.valueOf, 0);
  let td: number[] = Array.apply(null, new Array(10)).map(Number.prototype.valueOf, 0);
  let testTable: unknown[] = Array.from({length:50}).fill(0)
  const [cursor, setCursor] = useState<number>(0);
  const textlist = tr.map((tr,index:number) => (
    <D.TableTr key={index}>
      {td.map((td,index1:number) => (
        <D.TableTd key={index1} className={index === 4 ? 'no-border-bottom' : ''}>
          <div style={{border: cursor === index1 + 5 * index ? '1px solid black' : '0px'}}>{word[index1 + 10 * index]}</div>
        </D.TableTd>
      ))}
    </D.TableTr>
  ));

  const testTableList = testTable.map((table: any, idx: number) => 
    <div style={{border : '1px solid black', display:'flex', justifyContent:'center', alignItems:'center' }}>
      <div style={{display:'flex'}}>
        <DW.LeftCursor idx={idx} cursor={cursor}/>
        {word[idx]}
        <DW.RightCursor idx={idx} cursor={cursor}/>
      </div>
    </div>
  )
    
  function wordInput(e:any) {
    setWord(e.target.value)
    // setCursor(n => n = word.length > e.target.value.length ? n - 1 : word.length === e.target.value.length ? n : n + 1)
    props.setContent(e.target.value);
    if(word.length > 50) {
      setLimitWordLength(true)
      setWord(word => word.substring(0, 50))
    }
  }
  const [cursorLoc, setCursorLoc] = useState<any>()
  useEffect(() => {
    setCursorLoc(document.querySelector('#word'))
  },[])
  

  const [isFocus, setIsFocus] = useState<boolean>(false)
  // if (isFocus) {
    
  // }
  const keyDown = (e:any) => {
  // if (cursorLoc) {
    // cursorLoc.addEventListener('keydown', (e : any) => {
    setCursor(cursorLoc.selectionStart)
    // })
  // }
    // console.log(e)
    // const curCode = e.code
    // console.log(curCode)
    // if (curCode === "ArrowLeft") {
    //   setCursor((n)=>n === 0 ? 0 : n-1);
    // } else if (curCode === "ArrowRight") {
    //   setCursor((n)=>n === word.length ? word.length : n+1)
    // }
  }
  // console.log(isFocus)
  return (
    <D.PaperContainer>
      <DW.GridContent onFocus={()=>setIsFocus(true)} onBlur={()=>setIsFocus(false)} spellCheck="false" id="word" value={word} onChange={wordInput} onKeyUp={keyDown}/>
      <label htmlFor='word'>
        {/* {textlist}   */}
        <div style={{display:'grid', gridTemplateColumns:'repeat(10, 1fr)', gridTemplateRows:'repeat(5, 1fr)', border:'1px solid black', height:'100%'}}>
          {testTableList}
        </div>
      </label>
    </D.PaperContainer>
  );
}

export default Manuscript;


