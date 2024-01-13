import * as S from '../styles/modal.style';

function KonlplyLoading() {
  return (
    <S.Background>
      <S.Container>
        <S.LoadingWrap>
          <S.LoadingImg src='/images/drawinglogo.gif' alt='loading' />
        </S.LoadingWrap>
        이미지를 가져오는 중입니다...
      </S.Container>
    </S.Background>
  );
}

export default KonlplyLoading;
