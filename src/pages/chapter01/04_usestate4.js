import React, { useState } from 'react';
// 값으로 상태 갱신하기 (흥미로운방법, 두번클릭해도 한번만? 이건 안되는데?)
export const ComponentUsestate4 = () => {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      {count}
      <button onClick={()=>{ setCount(count + 1) }}>set Count to {count + 1}</button>
    </div>
  )
}