import React from 'react';
import * as O from '../../styles/bookshape/opendbook.style';

type BookShape2LProps = {
  children:React.ReactNode;
}

function BookShape2L({ children }:BookShape2LProps) {
  return( 
    <O.OpenBookLeft>
      {children}
      <O.Line position="right" deg="to right" />
    </O.OpenBookLeft>
  )
}

export default BookShape2L;

