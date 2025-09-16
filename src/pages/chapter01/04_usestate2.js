import React, { useState } from 'react';

export const ComponentUsestate2 = () => {
  const [state, setState] = useState({count:0});
  
  return (
    <div>
      {state.count}
      <button onClick={()=>setState({count:1})}>set Count to 1</button>
    </div>
  )
}