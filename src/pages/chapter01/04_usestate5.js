import React, { useState } from 'react';
// 함수로 상태 갱신하기
export const ComponentUsestate5 = () => {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      {count}
      <button onClick={()=>{ setCount((c)=> c + 1) }}>Increment Count</button>
    </div>
  )
}