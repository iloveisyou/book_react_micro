import React, {useReducer} from 'react';
// 지연 초기화(init)
const init = (count) => ({count, text: 'hi'}); 

const reducer = (state, action) => {
  switch(action.type) {
    case 'INCREMENT': return { ...state, count: state.count + 1 };
    case 'SET_TEXT': return { ...state, text: action.text };
    default: throw new Error('unknown action type');
  }
};

export const ComponentUsereducer4 = () => {
  const [state, dispatch] = useReducer( reducer, 0, init );
  return (
    <div>
      {state.count}
      <button onClick={()=>dispatch({type: 'INCREMENT' })}>Increment count</button>
      <input value={state.text} onChange={(e)=>dispatch({ type: 'SET_TEXT', text: e.target.value })} />
    </div>
  )
}
