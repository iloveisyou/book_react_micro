import React, {useReducer} from 'react';
// 원시 값
const reducer = (count, delta) => {
  if(delta < 0) { throw new Error('delta cannot be negative'); }
  if(delta > 10) { return count; } // 너무 크다면 무시
  if(count < 100) { return count + delta + 10; } // 보너스를 더한다
  return count + delta;
};

export const ComponentUsereducer3 = () => {
  const [count, dispatch] = useReducer( reducer, 0 );
  return (
    <div>
      {count}
      <br /><button onClick={()=>dispatch(3)}>action</button>
    </div>
  )
}
