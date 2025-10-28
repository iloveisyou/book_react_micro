import React, { useState } from 'react';
// 지연 초기화
const init = () => 0;

export const ComponentUsestate7 = () => {
  const [count, setCount] = useState(init);
  
  return (
    <div>
      {count}
      <button onClick={()=>{ setCount((c)=> c + 1) }}>Increment Count</button>
    </div>
  )
}