import {useEffect, useState} from 'react';
import * as D from '../../../styles/diary/diary.style';
import * as DW from '../../../styles/diary/diarywrite.style';
import { useStore } from '@/store/store';
import moveCursor from '@/utils/moveCursor';

/* 원고지 틀 컴포넌트 */
function Manuscript(props:any) {
  const emptySections: unknown[] = Array.from({length:50}).fill(0)

  const [cursorLocation, setCursorLocation] = useState<any>(undefined);
  const [word, setWord] = useState<string>('');
  const [cursor, setCursor] = useState<number>(0);

  const { setLimitWordLength } = useStore();

  const moveCursorDatas = {
    cursor: cursor,
    cursorLocation: cursorLocation?.selectionStart,
    word: word,
    setCursor: setCursor,
  };

  const showManuscript = emptySections.map((emptySection: unknown, idx: number) => 
    <DW.EachWordWrap>
      <DW.CursorWrap>
        <DW.LeftCursor idx={idx} cursor={cursor}/>
        {word[idx]}
        <DW.RightCursor idx={idx} cursor={cursor}/>
      </DW.CursorWrap>
    </DW.EachWordWrap>
  )
    
  const wordInput = (e:React.ChangeEvent<HTMLTextAreaElement>) => {
    setWord(e.target.value);
    props.setContent(e.target.value);
    if(word.length > 50) {
      setLimitWordLength(true);
      setWord(word => word.substring(0, 50));
    }
  }

  useEffect(() => {
    setCursorLocation(document.querySelector('#word'))
  },[])
  
  return (
    <D.PaperContainer>
      <DW.GridContent spellCheck="false" id="word" value={word} onChange={wordInput} onKeyUp={(e) => moveCursor(e, moveCursorDatas)} />
      <label htmlFor='word'>
        <DW.ShowManuScriptWrap>
          {showManuscript}
        </DW.ShowManuScriptWrap>
      </label>
    </D.PaperContainer>
  );
}

export default Manuscript;


