import {useState} from 'react';
import * as D from '../../../styles/diary/diary.style';
import * as DW from '../../../styles/diary/diarywrite.style';
import { useStore } from '@/store/store';

/* 원고지 틀 컴포넌트 */
function Manuscript(props:any) {
  const [word, setWord] = useState<string>('');
  const {setLimitWordLength} = useStore()
  let tr:number[] = Array.apply(null, new Array(5)).map(Number.prototype.valueOf, 0);
  let td:number[] = Array.apply(null, new Array(10)).map(Number.prototype.valueOf, 0);
  const textlist = tr.map((tr,index:number) => (
    <D.TableTr key={index}>
      {td.map((td,index1:number) => (
        <D.TableTd key={index1} className={index === 4 ? 'no-border-bottom' : ''}>
          <div>{word[index1 + 10 * index]}</div>
        </D.TableTd>
      ))}
    </D.TableTr>
  ));

  function wordInput(e:any) {
    setWord(e.target.value)
    props.setContent(e.target.value);
    if(word.length > 50) {
      setLimitWordLength(true)
      setWord(word => word.substring(0, 50))
    }
  }
  return (
    <D.PaperContainer>
      <DW.GridContent spellCheck="false" id="word" value={word} onChange={wordInput}/>
      <label htmlFor='word'>
        {textlist}  
      </label>
    </D.PaperContainer>
  );
}

export default Manuscript;


