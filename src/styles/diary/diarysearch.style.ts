import styled from 'styled-components';

interface SearchWrapProps {
  isSelected: boolean;
}

export const SearchContainer = styled.div`
  width: 100%;
  height: 85%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 15px 15px;
  margin-bottom: 5px;
  box-sizing: border-box;
  cursor: pointer;
  overflow: auto;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const SearchWrap = styled.div<SearchWrapProps>`
  width: 95%;
  border-radius: 8px;
  background-color: #ffffff;
  border: ${(props: any) =>
    !props.isSelected
      ? '0.8px solid #E4E4E4'
      : `3px solid ${props.theme.btnColor}`};
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px 10px;
  box-sizing: border-box;
  > hr {
    height: 100%;
    width: 1px;
    margin: 0 20px;
    border: 0.8px solid #c9c9c9;
  }
`;

export const SearchDate = styled.div`
  font-family: 'Poor Story';
  color: #373737;
  text-align: center;
  > h2 {
    font-size: 36px;
    -webkit-text-stroke: 0.4px #373737;
    margin-bottom: 3px;
  }
  > div {
    font-size: 20px;
  }
`;

export const SearchContentContainer = styled.div`
  width: 78%;
  height: 100%;
  padding: 0 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const SearchTitleWrap = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
  margin-bottom: 5px;
  > div {
    font-size: 36px;
    margin-right: 10px;
  }
  > p {
    font-family: 'Poor Story';
    color: #373737;
    font-size: 24px;
  }
`;

export const SearchContent = styled.div`
  width: 100%;
  font-family: 'Poor Story';
  color: #373737;
  font-size: 18px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
