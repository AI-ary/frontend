import {useEffect, useRef, useState} from 'react';
import * as D from '../../../styles/diary/diary.style';
import * as DW from '../../../styles/diary/diarywrite.style';
import { useStore } from '@/store/store';
import moveCursor from '@/utils/moveCursor';

/* 원고지 틀 컴포넌트 */
function Manuscript(props:any) {
  const emptySections: unknown[] = Array.from({length:50}).fill(0)

  const [cursorLocation, setCursorLocation] = useState<any>(undefined);
  const [word, setWord] = useState<string>('');
  const wordLength = useRef<number>(word.length);
  const [cursor, setCursor] = useState<number>(0);

  const { setLimitWordLength } = useStore();

  const moveCursorDatas = {
    cursor: cursor,
    cursorLocation: cursorLocation,
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
    wordLength.current = e.target.value.length;
    props.setContent(e.target.value);
    if(wordLength.current > 50) {
      setLimitWordLength(true);
      setWord(word => word.substring(0, 50));
    } else if (wordLength.current === 50) {
      return;
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


