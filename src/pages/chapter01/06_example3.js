import React, {useReducer, useState} from 'react';

// 초기화 함수 사용하기
const init = (count) => ({count});

const reducer = (prev, delta) => ({ ...prev, count: prev.count + delta });

const ComponentWithUseReducer = ({initialCount}) => {
  const [state, dispatch] = useReducer(reducer, initialCount, init);
  
  return (
    <div>
      {state.count}
      <button onClick={()=>dispatch(1)}>+1</button>
    </div>
  )
}

const ComponentWithUseState = ({initialCount}) => {
  const [state, setState] = useState(() => init(initialCount));
  const dispatch = (delta) => setState((prev) => reducer(prev, delta));

  return (
    <div>
      {state.count}
      <button onClick={() => dispatch(1)}>+1</button>  
    </div>
  )
}

// 복습 연습하기
const init2 = (count) => ({count});
const reducer2 = (state, action) => ({...state, count: state.count + action}); 
const ComponentWithUseReducer2 = ({initCount}) => {
  const [state, dispatch] = useReducer(reducer2, initCount, init2);
  return (
    <div>
      {state.count}
      <button type="button" onClick={()=>dispatch(3)}>+3</button>
    </div>
  )
}

export const Component1Example3 = ({initialCount=1}) => {
  return (
    <div>
      <ComponentWithUseReducer initialCount={1} />
      <div>==========================</div>
      <ComponentWithUseState initialCount={2} />
      <div>==========================// 복습 연습하기</div>
      <ComponentWithUseReducer2 initCount={5} />
    </div>
  )
}