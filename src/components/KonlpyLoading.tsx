import * as S from '../styles/modal.style'

function KonlplyLoading() {
  return (
    <S.Background>
      <S.Container>
        {/* version 1 */}
        <S.LoadingWrap>
          <svg className='circle'>
            <circle cx="50%" cy="50%" r="30"/>
          </svg>
        </S.LoadingWrap>
        {/* version 2 */}
        {/* <span className="loader"></span> */}
        이미지를 가져오는 중입니다...
      </S.Container>
    </S.Background>
  )   
}

export default KonlplyLoading