import React, { useState } from 'react';
// 값으로 상태 갱신하기 
export const ComponentUsestate = () => {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      {count}
      <button onClick={()=>setCount(1)}>set Count to 1</button>
    </div>
  )
}