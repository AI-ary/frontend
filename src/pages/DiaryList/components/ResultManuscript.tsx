import * as S from '../../../styles/diary/diary.style';

interface ResultManuscriptProps{
  content: string;
}


/* 리스트 원고지 틀 컴포넌트 */
function ResultManuscript({ content }:ResultManuscriptProps) {
  const divi = content.split('');
  let tr = Array.apply(null, new Array(5)).map(Number.prototype.valueOf, 0);
  let td = Array.apply(null, new Array(10)).map(Number.prototype.valueOf, 0);
  const textlist = tr.map((tr, index) => (
    <div style={{ display: 'flex' }} key={index}>
      {td.map((td, index1) => (
        <S.TableTd key={index1}>
          <div style={{ paddingTop: '5px' }}>{divi[index1 + 10 * index]}</div>
        </S.TableTd>
      ))}
    </div>
  ));

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-end',
        position: 'relative',
        marginTop: '20px',
        marginLeft: '7px',
      }}
    >
      <S.PaperContainer>
        <label>{textlist}</label>
      </S.PaperContainer>
    </div>
  );
}
export default ResultManuscript;
