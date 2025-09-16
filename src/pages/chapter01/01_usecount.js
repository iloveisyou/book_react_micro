import React, { useState, useEffect } from 'react';

const useCount = () => {
  const [count, setCount] = useState(0);
  const inc = () => setCount((c)=>c+1);
  useEffect(()=>{
    console.log('count is changed to', count);
  },[count]);
  return[count, inc]
}

export const ComponentUsecount = () => {
  const [count, setCount] = useCount();
  return (
    <div>
      {count}
      <button onClick={()=> setCount((c)=>c+2)}>+1</button>
    </div>
  )
}