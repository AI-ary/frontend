import React from 'react';
import * as O from '../../styles/bookshape/opendbook.style';

type OpenBookLeftProps = {
  children:React.ReactNode;
}

function OpenBookLeft({ children }:OpenBookLeftProps) {
  return( 
    <O.OpenBookLeft>
      {children}
      <O.Line position="right" deg="to right" />
    </O.OpenBookLeft>
  )
}

export default OpenBookLeft;

