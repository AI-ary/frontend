import Bookmark from '@/components/bookshape/Bookmark';
import OpenBookLeft from '@/components/bookshape/OpenBookLeft';
import OpenBookRight from '@/components/bookshape/OpenBookRight';
import * as C from '../styles/bookshape/closedbook.style'
import * as O from '../styles/bookshape/opendbook.style'
import * as I from '../styles/introduce.style'

export default function Introduce() {
  return (
    <C.Container>
      <O.BookContainer>
        <OpenBookLeft withClose={false}>
          <I.GuideContainer>
            <I.GuideTitle>{'<'} AIARY 사용 가이드 {'>'}</I.GuideTitle>
            <div>
              <I.GuideTitleWrap><I.GuideNum>1</I.GuideNum>다이어리 테마 변경</I.GuideTitleWrap>
              <I.GuideContent>첫 화면 좌측에 있는 테마 버튼을 선택한 뒤, 마음에 드는 테마를 선택하고 체크 버튼을 눌러주면 테마가 적용됩니다.</I.GuideContent>
              <I.GuideImgWrap>
                <I.GuideImgTheme src='/images/guidetheme1.png' alt='guide' />
                ▶︎
                <I.GuideImgTheme src='/images/guidetheme2.png' alt='guide' />
                ▶︎
                <I.GuideImgTheme src='/images/guidetheme3.png' alt='guide' />
              </I.GuideImgWrap>
            </div>
            <div>
              <I.GuideTitleWrap><I.GuideNum>2</I.GuideNum>감정 이모티콘 표현</I.GuideTitleWrap>
              <I.GuideContent>일기 작성 페이지 우측 상단에 있는 이모티콘 버튼을 통해 그 날의 감정이나 상태를 다양한 이모티콘으로 표현할 수 있습니다.</I.GuideContent>
            </div>
            <div>
              <I.GuideTitleWrap><I.GuideNum>3</I.GuideNum>그림 그리기</I.GuideTitleWrap>
              <I.GuideContent>일기 작성 페이지에서 그림 그리기 버튼을 누른 뒤, 여러가지 색과 지우개, 뒤로가기 버튼으로 자유롭게 그림을 그릴 수 있습니다.</I.GuideContent>
            </div>
          </I.GuideContainer>
        </OpenBookLeft>
        <OpenBookRight>
          <I.GuideContainer>
            <div>
              <I.GuideTitleWrap><I.GuideNum>4</I.GuideNum>그림 가져오기<span style={{color: 'red'}}>업데이트 예정 기능</span></I.GuideTitleWrap>
              <I.GuideContent>일기를 작성한 후, 그림 가져오기 버튼을 누르면 다이어리 속 추출된 키워드의 이미지가 왼쪽 페이지에 나열됩니다. 이미지는 드래그 앤 드롭하여 사용할 수 있습니다.</I.GuideContent>
              <I.GuideImgWrap>
                <I.GuideImgKonlpy src='/images/guidekonlpy.png' alt='guide' />
              </I.GuideImgWrap>
            </div>
            <div>
              <I.GuideTitleWrap><I.GuideNum>5</I.GuideNum>Dall-E 가져오기</I.GuideTitleWrap>
              <I.GuideContent>일기를 작성한 후, Dall-E 가져오기 버튼을 누르면 다이어리 내용을 바탕으로 만들어진 이미지가 나옵니다. 마음에 드는 이미지를 선택하여 사용할 수 있습니다.</I.GuideContent>
            </div>
            <div>
              <I.GuideTitleWrap><I.GuideNum>6</I.GuideNum>실사 메모리 북 신청</I.GuideTitleWrap>
              <I.GuideContent>AIARY를 통해 만드는 내 다이어리를 실사 다이어리로 받아 볼 수 있습니다.</I.GuideContent>
              <I.GuideImgWrap>
                <I.GuideImgRealDiary src='/images/guiderealdiary1.png' alt='guide' />
                <I.GuideImgRealDiary src='/images/guiderealdiary2.png' alt='guide' />
              </I.GuideImgWrap>
            </div>
          </I.GuideContainer>
        </OpenBookRight>
        <Bookmark/>
      </O.BookContainer>
    </C.Container>
  )
}