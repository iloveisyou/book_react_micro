import React, { createContext, useState, useContext, useReducer, useEffect } from 'react';
import { createContainer, createTrackedSelector } from 'react-tracked';
import { createStore } from 'redux';
import { Provider, useDispatch, useSelector } from 'react-redux';


// ---------------------------------------------------------------------- useState

// ---------------------------------------------------------------------- useReducer, useEffect

// ---------------------------------------------------------------------- redux

const initialState = { count: 0, text: 'hello' };
const reducer = (state = initialState, action) => {
  if(action.type === 'INC') { return {...state, count: state.count + 1} };
  if(action.type === 'SET_TEXT') { return {...state,text: action.text } };
  return state;
};
const store = createStore(reducer);
const useTrackedState = createTrackedSelector(useSelector);
const Counter = () => {
  const dispatch = useDispatch();
  const { count } = useTrackedState();
  const inc = () => dispatch({  type: 'INC' });
  return (<div>count: {count} <button onClick={inc}>+1</button></div>)
};
// const count = useSelector(state => state.count); // react redux만 사용한다면 이렇게 작성해도 됨
const TextBox = () => {
  const dispatch = useDispatch();
  const state = useTrackedState();
  const setText = text => dispatch({type: 'SET_TEXT', text});
  return (<div> <input value={state.text} onChange={e=>setText(e.target.value)} /> </div>)
}
// const TextBox = (showCount) => { // 부울값인 showCount 속성ㅇ르 사용해 state의 count 값을 표시한다고 가정했을 이렇게 수정 
//   const dispatch =useDispatch();
//   const state = useTrackedState();
//   const setText = text => dispatch({type: 'SET_TEXT', text});
//   return (<div><input value={state.count} onChange={e=>setText(e.target.value)} /></div>)
// }
const App = () => (<Provider store={store}>
  <div>
    <Counter />
    <Counter />
    <TextBox />
    <TextBox />
  </div>
</Provider>)

export const ComponentReactTracked3 = () => {
  return (
    <div>
      <h3>10 사용사례 시나리오 4: React Tracked</h3>
      <br /> .....

      <br /><br /><div>&diams; <strong>React Redux와 함께 React Tracked 사용하기</strong></div>
      <br /> React Tracked는 주로 리액트 컨텍스트를 대체하는 용도로 사용 (내부적으로 use-context-selector를 사용)
      <br /> useContext 데체 -> createTracked Selector (저수준함수) 제공
      <br /> useSelector는 선택자 함수를 받아 선택자 함수의 결과를 반환하는 훅 - 결과 변경시 리렌더링
      <br /> useTrackedState는 상태사용을 추적하기 이ㅜ해 전체 상태를 프락시로 감사서 반환하는 훅
      <br /> React Redux : useSselector 훅 제공, 이를 createTrackedSelector 에 적용
      <App />
      <br /> 가장 최적화 잘된듯
      <br /> useTrackedState(자동) = (동일) = useSelector(개발자가세세하게제어)
      <br /><br /> React Tracked 구현은 proxy-compare, use-context-selector 라이브러리를 의존
      <br /> 방법1. 컨텍스트에서 createContainer을 사용 - 리액트 컨텍스트 사용사례 대체
      <br /> 방법2. React Redux에서 createTrackedSelector를 사용 - 다른 라이브러리(React Redux)에서 제공하는 선택자 훅 향상
      <br /> React Tracked에서 컨텍스를 사용하는 경우 useCountextSelector 훅이 중요
      <br /> React Tracked 라이브러리는 전역상태 라이브러릭 아님 -> useState, useReducer, Redux와 함께 사용 => 리렌더링최적화기능




      <br /><br /><br /><br /><br /><br /><br /><br />
    </div>
  )
}