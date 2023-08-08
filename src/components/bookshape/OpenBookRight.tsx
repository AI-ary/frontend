import React from 'react';
import * as O from '../../styles/bookshape/opendbook.style';

type OpenBookRightProps = {
  children:React.ReactNode;
}

function OpenBookRight({children}:OpenBookRightProps){
  return(   
    <O.OpenBookRight>
      <O.Line position="left" deg="to left" />
      {children}
    </O.OpenBookRight>
  )
}

export default OpenBookRight;

