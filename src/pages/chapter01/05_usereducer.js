import React, { useReducer } from 'react';
// 기본 사용법
const reducer = (state, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return { ...state, count: state.count + 1 };
    case 'SET_TEXT':
      return { ...state, text: action.text };
    default:
      throw new Error('unknown action type');
  }
}

export const ComponentUsereducer = () => {
  const [state, dispatch] = useReducer( reducer, { count: 0, text: 'hi' }, );
  return (
    <div>
      {state.count}
      <button onClick={()=>dispatch({type: 'INCREMENT'})}>Increment count</button>
      <input value={state.text} onChange={(e)=>dispatch({type: 'SET_TEXT', text: e.target.value})} />
    </div>
  )
}