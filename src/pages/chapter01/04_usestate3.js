import React, { useState } from 'react';
// 값으로 상태 갱신하기 (잘못된코드)
export const ComponentUsestate3 = () => {
  const [state, setState] = useState({count:0});
  
  return (
    <div>
      {state.count}
      <button onClick={()=>{ state.count = 1; setState(state); }}>set Count to 1</button>
    </div>
  )
}