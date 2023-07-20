import * as S from '../../styles/bookshape/closedbook.style'

const ClosedBook = ({ children }: React.PropsWithChildren) => {
    return(
        <S.Container>
            <S.Left />
            <S.Flip>
                <S.Mid>
                    {children}
                </S.Mid>
                <S.Right />
            </S.Flip>
        </S.Container>
    )
}

export default ClosedBook