import styled from 'styled-components';

export const GuideContainer = styled.div`
  height: 100%;
  width: 100%;
  padding: 60px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

export const GuideTitle = styled.h1`
  align-self:center;
  font-size:32px;
`

export const GuideTitleWrap = styled.p`
  margin-bottom:10px;
  display:flex;
  align-items:center;
  font-size:24px;
  font-weight:700;
`

export const GuideNum = styled.span`
  background-color:#373737;
  color:#ffffff;
  width:28px;
  height:28px;
  border-radius:50%;
  margin-right:10px;
  display:flex;
  justify-content:center;
  align-items:center;
  font-size:16px;
`

export const GuideContent = styled.p`
  font-size:18px;
  line-height:24px;
`

export const GuideImgWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`

export const GuideImgTheme = styled.img`
  width: 33%;
  margin-top: 10px;
`

export const GuideImgKonlpy = styled.img`
  margin-top: 10px;
`

export const GuideImgRealDiary = styled.img`
  width: 50%;
  margin-top: 10px;
`