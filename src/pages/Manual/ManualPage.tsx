import { WriteContainer, Book2Container } from '../WriteDiary/WriteGrimPage';
import BookShape2L from '../../components/bookshape/OpenBookLeft';
import BookShape2R from '../../components/bookshape/OpenBookRight';
import Bookmark from '../../components/bookshape/Bookmark';
import IntroduceL from './components/IntroduceL';
import IntroduceR from './components/IntroduceR';

function Manual() {
  return(
    <WriteContainer>
      <Book2Container style={{ paddingBottom: '60px'}}> 
        <BookShape2L>
          <IntroduceL />
        </BookShape2L>
        <BookShape2R>
          <IntroduceR />
        </BookShape2R>
        <Bookmark />
      </Book2Container>
    </WriteContainer>
  );
}

export default Manual;