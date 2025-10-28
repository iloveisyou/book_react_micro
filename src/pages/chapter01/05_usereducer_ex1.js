import React, { useReducer } from 'react';
// 기본사용법 연습하기1
const reducer = (state, action) => {
  switch (action.type) {
    case 'PLUS':
      return { ...state, count: state.count + 1 };
    case 'MINU':
      return { ...state, count: state.count - 1 };
    default:
      throw new Error('reducer error');
  }
}

export const ComponentUsereducerEx1 = () => {
  const [state, dispatch] = useReducer(reducer, { count: 0 },);
  return (
    <div>
      {state.count}
      <button onClick={()=>dispatch({type: 'MINU'})}>Minu</button>
      <button onClick={()=>dispatch({type: 'PLUS'})}>Plus</button>
    </div>
  )
}