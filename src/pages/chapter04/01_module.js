import React, { useEffect } from 'react';

let count = 0;
let state = { count: 0, };
let setStateFunctions = new Set();

export const getState = () => state;

export const setState = (nextState) => { state = nextState; }

export const setState2 = (nextState) => {
  state = typeof nextState === 'function' ? nextState(state) : nextState;
}

export const createContainer = (initialState) => {
  let state = initialState;
  // console.log(initialState);
  const getState3 = () => state;
  const setState3 = (nextState) => {
    state = (typeof nextState === 'function') ? nextState(state) : nextState
  }
  // console.log(setState3());
  return { getState3, setState3 };
}



export const ComponentModule = () => {
  const { getState3, setState3  } = createContainer({count: 0});
    
  // getState(count);
  // const inc = () => setState(prev => ({count: prev.count + 3}));
  
  const inc = () => {
    // setState((prev)=>({...prev, count: 2}));
    state.count += 1;
    setState(state);  
    console.log(state);
  }


  const inc2 = () => {
    setState2((prevState) => ({...prevState, count: prevState.count + 1}) );
    console.log(state);
  }

  const inc3 = () => {
    setState3((prevState) => ({...prevState, count: prevState.count + 1}) );
    // setStateFunctions.add(setState3())
    // console.log(getState3(state));
    console.log(getState3());
    // console.log(setState3({count : getState3(state) + 1}));
    // console.log(state);
  }


  return (
    <div>
      <h3>모듈상태 살펴보기</h3>
      <br /><br /><div>===== 함수 갱신하기</div>
      count: {state.count}
      <button type="button" onClick={inc}>+1</button>
      <button type="button" onClick={inc2}>+1</button>
      <br /><br /><div>===== createContainer 만들기 (리액트문법이 아니라 리렌더 일어나지 않음)</div>
      coount3: {getState3().count}
      <button type="button" onClick={inc3}>+1</button>
    </div>
  )
}