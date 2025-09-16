import React, { useState } from 'react';

export const ComponentUsestate3 = () => {
  const [state, setState] = useState({count:0});
  
  return (
    <div>
      {state.count}
      <button onClick={()=>{ state.count = 1; setState(state); }}>set Count to 1</button>
    </div>
  )
}