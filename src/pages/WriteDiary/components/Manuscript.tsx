import {useState} from 'react';
import Swal from 'sweetalert2';
import * as S from '../../../styles/diary/diary.style';

/* 원고지 틀 컴포넌트 */
function Manuscript(props:any) {
  const [word, setWord] = useState<string>('');
  let tr:number[] = Array.apply(null, new Array(5)).map(Number.prototype.valueOf, 0);
  let td:number[] = Array.apply(null, new Array(10)).map(Number.prototype.valueOf, 0);

  const textlist = tr.map((tr,index:number) => (
    <div style={{display: 'flex'}} key={index}>
      {td.map((td,index1:number) => (
        <S.TableTd key={index1}><div style={{paddingTop:'5px'}}>{word[index1 + 10 * index]}</div></S.TableTd>
      ))}
    </div>
  ));

  function wordInput(e:any) {
    setWord(e.target.value)
    props.setContent(e.target.value);
    if(word.length > 50) {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: '50글자 이하로 작성해 주세요.',
        showConfirmButton: false,
        timer: 2000
      })
      setWord(word => word.substring(0, 50))
    }
  }
  return (
    <div style={{marginTop:'13px', marginLeft:'3px'}}>
      <S.PaperContainer>
        <S.GridContent spellCheck="false" id="word" value={word} onChange={wordInput}/>
        <label htmlFor='word'>
          {textlist}  
        </label>
      </S.PaperContainer>
    </div>
  );
}

export default Manuscript;