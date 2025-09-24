import React, { useReducer } from 'react';

// useReducer를 이용한 useState 구현
const useState = (initialState) => {
  const [state, dispatch] = useReducer(
    (prev, action) => typeof action === 'function' ? action(prev) : action, 
    initialState
  );
  return [state, dispatch];
}

// useReducer를 이용한 useState 구현 - 단순화하고 개선
const reducer = (prev, action) => typeof action === 'function' ? action(prev) : action;
const useState2 = (initialState) => useReducer(reducer, initialState);

// 복습 연습하기
const useState3 = (init) => {
  const [state, dispatch] = useReducer( (prev, action) => typeof action === 'function' ? action(prev) : action ,init);
  return [state, dispatch]
}
const useState4 = (init) => {
  const [state, dispatch] = useReducer((prev, action) => typeof action === 'function' ? action(prev) : action, init);
  return [state, dispatch];
}
const useState5 = (init) => {
  const [state, dispatch] = useReducer((prev,action) => typeof action === 'function' ? action(prev) : action , init);
  return [state, dispatch];
}
const reducer2 = (prev, action) => typeof action === 'function' ? action(prev) : action;
const useState6 = (init) => useState(reducer2, init);

const reducer3 = (prev, action) => typeof action === 'function' ? action(prev) : action;
const useState7 = (init) => useReducer(reducer3, init);


export const Component1Example = () => {
  const [text, setText] = useState('hi');
  const [val, setVal] = useState('');
  const onClick = () => setText(val);

  const [text2, setText2] = useState2('hi2');
  const [val2, setVal2] = useState2('');
  const onClick2 = () => setText2(val2);
  // 복습 연습하기
  const [text3, setText3] = useState3('hi3');
  const [val3, setVal3] = useState3('');
  const onClick3 = () => setText3(val3);

  return (
    <div>
      text: {text}<br />
      <input type="text" value={val} onChange={(e)=>setVal(e.target.value)} />
      <button type="text" onClick={onClick}>text change</button>
      <br /><br />
      text: {text2}<br />
      <input type="text" value={val2} onChange={(e)=>setVal2(e.target.value)} />
      <button type="text" onClick={onClick2}>text change</button>
      <br /><br />
      // 복습 연습하기
      text: {text3}<br />
      <input type="text" value={val3} onChange={(e)=>setVal3(e.target.value)} />
      <button type="text" onClick={onClick3}>text change</button>
    </div>  
  )
    
}
