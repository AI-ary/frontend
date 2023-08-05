import React from 'react';
import * as O from '../../styles/bookshape/opendbook.style';

type BookShape2RProps = {
  children:React.ReactNode;
}

function BookShape2R({children}:BookShape2RProps){
  return(   
    <O.OpenBookRight>
      <O.Line position="left" deg="to left" />
      {children}
    </O.OpenBookRight>
  )
}

export default BookShape2R;

