import React, { useState, useEffect } from 'react';
// 함수로 상태 갱신하기 (베일아웃)
export const ComponentUsestate6 = () => {
  const [count, setCount] = useState(0);

  useEffect(()=> {
    const id = setInterval( () => setCount((c) => c + 1 ), 1000, );
    return () => clearInterval(id);
  },[]);
  
  return (
    <div>
      {count}
      <button onClick={()=>{ setCount((c)=> c % 2 === 0 ? c : c + 1) }}>Increment Count</button>
    </div>
  )
}