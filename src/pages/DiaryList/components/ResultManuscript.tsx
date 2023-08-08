import * as D from '../../../styles/diary/diary.style';

interface ResultManuscriptProps{
  content: string;
}

/* 리스트 원고지 틀 컴포넌트 */
function ResultManuscript({ content }:ResultManuscriptProps) {
  const divi = content.split('');
  let tr = Array.apply(null, new Array(5)).map(Number.prototype.valueOf, 0);
  let td = Array.apply(null, new Array(10)).map(Number.prototype.valueOf, 0);
  const textlist = tr.map((tr, index) => (
    <D.TableTr key={index}>
      {td.map((td, index1) => (
        <D.TableTd key={index1} className={index === 4 ? 'no-border-bottom' : ''}>
          <div>{divi[index1 + 10 * index]}</div>
        </D.TableTd>
      ))}
    </D.TableTr>
  ));

  return (
    <D.PaperContainer>
      <label>{textlist}</label>
    </D.PaperContainer>
  );
}
export default ResultManuscript;
