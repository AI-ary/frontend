import React from 'react';
import * as O from '../../styles/bookshape/opendbook.style';

type OpenBookRightProps = {
  children:React.ReactNode;
}

function OpenBookRight({children}:OpenBookRightProps){
  return (   
    <div style={{position:'relative', zIndex:-1, height:'100%'}}>
      <O.OpenBookRight>
        <O.Line position="left" deg="to left" />
        {children}
      </O.OpenBookRight>
    </div>
  )
}

export default OpenBookRight;

