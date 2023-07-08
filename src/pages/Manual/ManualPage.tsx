import * as S from '../../styles/diary/diary.style';
import Bookmark from '../../components/bookshape/Bookmark';
import * as M from '../../styles/manual/manual.style';

function Manual() {
  return(
    <S.WriteContainer>
      <S.Book2Container> 
        <S.BookShape2Left>
          <M.IntroduceContainer>
            <M.LogoImg src="images/logo.png" alt="logo" />
            <M.Introducetitle>
            What about<span style={{color:'orange', fontWeight:'700'}}>&nbsp;G-Diary?</span>
            </M.Introducetitle>
            <div style={{fontSize:'23px', fontWeight: 'bolder',textAlign:'center', fontFamily:'KyoboHand', marginBottom:'8px', color:'#777777'}}>About Team..?</div>
            <M.IntroduceTeam>
              <M.Team><M.TeamImg src="images/park.JPG" alt="team" /><M.TeamGit href="https://github.com/gmlrude">HeeKyeong</M.TeamGit></M.Team>
              <M.Team><M.TeamImg src="images/jang.JPG" alt="team" /><M.TeamGit href="https://github.com/aristo0922">AhRyeong</M.TeamGit></M.Team>
              <M.Team><M.TeamImg src="images/yoon.JPG" alt="team" /><M.TeamGit href="https://github.com/yangwonjoon">WonJoon</M.TeamGit></M.Team>
              <M.Team><M.TeamImg src="images/lim.JPG" alt="team" /><M.TeamGit href='https://github.com/gs0428'>GwangSoo</M.TeamGit></M.Team>
              <M.Team><M.TeamImg src="images/yang.JPG" alt="team" /><M.TeamGit href='https://github.com/yunyoungse2222'>YoungSe</M.TeamGit></M.Team>
              <M.Team><M.TeamImg src="images/lee.JPG" alt="team" /><M.TeamGit href='https://github.com/alswlfl29'>MinJi</M.TeamGit></M.Team>
            </M.IntroduceTeam>
          </M.IntroduceContainer>
        </S.BookShape2Left>
        <S.Line />
        <S.BookShape2Right>
          <M.IntroduceContainer>
            <M.ServiceImg src="images/introduce.png" alt="service"/>
            <M.ServiceInfo style={{marginTop: '20px'}}>
              1. 해당 날짜의 <span style={{color:'red', fontWeight:'600'}}>일기를 작성</span>해주세요!<br />
              2. AI가 일기에서<span style={{color:'red', fontWeight:'600'}}> 키워드를 추출</span>하여 그림리스트를<br />&nbsp;&nbsp;&nbsp;제공해요~<br />
              3. <span style={{color:'red', fontWeight:'600'}}>원하는 그림을 선택</span>하거나 <span style={{color:'red', fontWeight:'600'}}>직접그림을 그려서</span><br />&nbsp;&nbsp;&nbsp;&nbsp;일기를 완성해보세요!
            </M.ServiceInfo>
          </M.IntroduceContainer>
        </S.BookShape2Right>
        <Bookmark />
      </S.Book2Container>
    </S.WriteContainer>
  );
}

export default Manual;