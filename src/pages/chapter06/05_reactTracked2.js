import React, { createContext, useState, useContext, useReducer, useEffect } from 'react';
import { createContainer, createTrackedSelector } from 'react-tracked';


// ---------------------------------------------------------------------- useState

// ---------------------------------------------------------------------- useReducer, useEffect

const useValue3 = () => {
  const [state, dispatch] = useReducer((state, action) => {
    if(action.type === 'INC') { return {...state, count: state.count + 1} }
    if(action.type==='SET_TEXT') { return {...state, text: action.text} }
    throw new Error('unknow action type');
  }, {count: 0, text: 'hello'});
  useEffect(()=>{ console.log('last state', state); }, [state]);
  return [state, dispatch];
}
const { Provider, useTracked } = createContainer(useValue3);
const Counter4 = () => {
  const [state, dispatch] = useTracked();
  const inc = () => dispatch({type: "INC"});
  return (<div> count: {state.count} <button type="butotn" onClick={inc}>+1</button></div>);
}
const TextBox4 = () => {
  const [state, dispatch] = useTracked();
  const setText = (text) => dispatch({type: "SET_TEXT", text});
  return (<div><input value={state.text} onChange={e=>setText(e.target.value)} /></div>)
}
const App4 = () => (<Provider>
  <div>
    <Counter4 />
    <Counter4 />
    <TextBox4 />
    <TextBox4 />
  </div>
</Provider>);

// ---------------------------------------------------------------------- redux



export const ComponentReactTracked2 = () => {
  return (
    <div>
      <h3>10 사용사례 시나리오 4: React Tracked</h3>
      <br /> .....
      
      <br /><br /><div>&diams; <strong>UseReducer와 함께 React Tracked 사용하기</strong></div>
      <br /> 이전에는 useState를 사용하였지만 이젠 useReducer 사용
      <br /> useReducer 공식 리액트 훅 -> 상태를 갱싱하는데 사용하는 리듀서 함수를 받음 -> 리듀서 함수는 자바스크립트와 무관하게 사용할수 있는 프로그래밍 패턴
      <br /> 이 패턴을을 적용하는게 useReducer훅 -> Reducer의 리듀서 패턴을 따름 
      <br /> useReducer 훅 : React Redux, 스토어 인핸서(sotre enhancer), 미들웨어와 가은 Redux의 다른 기능 다루지 않음
      <br /> type 속성이 있는 객체여야 하는 Redux와는 다르게 모든 종류의 액션을 허용
      <App4 />



      <br /><br /><br /><br /><br /><br /><br /><br />
    </div>
  )
}