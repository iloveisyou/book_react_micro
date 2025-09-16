import React, { useState } from 'react';

export const ComponentUsestate4 = () => {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      {count}
      <button onClick={()=>{ setCount(count + 1) }}>set Count to {count + 1}</button>
    </div>
  )
}