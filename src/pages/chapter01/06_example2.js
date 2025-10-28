import React, { useState, useCallback } from 'react';

// useState를 이용한 useReducer 구현
const useReducer = (reducer, initialState) => {
  const [state, setState] = useState(initialState);
  const dispatch = (action) => setState(prev => reducer(prev, action));
  return [state, dispatch];
}
const reducer = (state,action) => {
  switch (action.type) {
    case 'COUNT': return ({ ...state, count: state.count + 1 });
    case 'TEXT': return ({ ...state, text: action.text });
    default: throw new Error('reducer error');
  }
}

// useState를 이용한 useReducer 구현 - 초기값 추가
const useReducer2 = (reducer, initialArg, init) => {
  const [state, setState] = useState(init ? init(initialArg) : initialArg, );
  const dispatch = useCallback((action) => setState(prev => reducer(prev, action)), [reducer]);
  return [state, dispatch];
}
const reducer2 = (state,action) => {
  switch (action.type) {
    case 'COUNT': return ({ ...state, count: state.count + 1 });
    case 'TEXT': return ({ ...state, text: action.text });
    default: throw new Error('reducer error');
  }
}

// 복습 연습하기
const useReducer3 = (reducer, initArg, init) => {
  const [state, setState] = useState(init ? init(initArg) : initArg);
  const dispatch = useCallback((action) => setState(prev => reducer(prev, action)), [reducer]);
  return [state, dispatch];
}
const reducer3 = (state, action) => {
  switch (action) {
    case 'a' : return 'A타입';
    case 'b' : return 'B타입';
    case '' : return '';
    default: return action + '라고 입력했네? a 나 b 만 입력하라고 했는데?';
  }
}

const useReducer4 = (reducer, initArg, init) => {
  const [state, setState] = useState(init? init(initArg) : initArg);
  const dispatch = useCallback((action) => setState(prev => reducer(prev, action)), [reducer]);
  return [state, dispatch]
}
const useReducer5 = (reducer, initArg, init) => {
  const [state, setState] = useState(init ? init(initArg) : initArg);
  const dispatch = useCallback((action) => setState(prev => reducer(prev, action)), [reducer]);
  return [state, dispatch];
}
const useReducer6 = (reducer, initArg, init) => {
  const [state, setState] = useState(init ? init(initArg) : initArg);
  const dispatch = useCallback((action) => setState(prev => reducer (prev + action)), [reducer]);
  return [state, dispatch];
}
const useReducer7 = (reducer, initArg, init) => {
  const [state, setState] = useState(init ? init(initArg) : initArg);
  const dispatch = useCallback((action) => setState(prev => reducer(prev, action)), [reducer]);
  return [state, dispatch];
}


export const Component1Example2 = () => {
  const [state, dispatch] = useReducer(reducer, { count: 0, text: 'hi' });
  const [state2, dispatch2] = useReducer(reducer2, { count: 10, text: 'hi2' });
  const [text3, dispatch3] = useReducer(reducer3, '');
  
  return (
    <div>
      text: {state.text}<br />
      count: {state.count}<br />
      <input type="text" value={state.text} onChange={(e)=>dispatch({type: 'TEXT', text: e.target.value})} />
      <button type="text" onClick={()=>dispatch({type: 'COUNT'})}>{state.count}번째 클릭</button>
      <br /><br />
      text: {state2.text}<br />
      count: {state2.count}<br />
      <input type="text" value={state2.text} onChange={(e)=>dispatch2({type: 'TEXT', text: e.target.value})} />
      <button type="text" onClick={()=>dispatch2({type: 'COUNT'})}>text change</button>
      <br /><br /> // 복습 연습하기
      text: {text3}<br />
      <input type="text" onChange={(e)=>dispatch3(e.target.value)} placeholder='a 나 b 만 입력하세요' />
    </div>  
  )
    
}
