import React, { useState } from 'react';
// 값으로 상태 갱신하기 (다른예제)
export const ComponentUsestate2 = () => {
  const [state, setState] = useState({count:0});
  
  return (
    <div>
      {state.count}
      <button onClick={()=>setState({count:1})}>set Count to 1</button>
    </div>
  )
}