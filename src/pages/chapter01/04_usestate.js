import React, { useState } from 'react';

export const ComponentUsestate = () => {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      {count}
      <button onClick={()=>setCount(1)}>set Count to 1</button>
    </div>
  )
}