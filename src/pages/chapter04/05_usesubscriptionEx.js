import React, { useState, useReducer, useCallback, useEffect } from 'react';

function useCounter(initCount=0) {
  const [counter, setCounter] = useState(initCount);
  function inc() {
    setCounter(prev => prev + 1);
  }
  return {counter, inc};
}

function Counter1() {
  const {counter, inc} = useCounter();
  return <div>Counter1: {counter} <button type="button" onClick={inc}>+1</button></div>
}
function Counter2() {
  const {counter, inc} = useCounter();
  return <div>Counter2: {counter} <button type="button" onClick={inc}>+1</button></div>
}
function App1() {
  return <><Counter1 /><Counter2 /></>
}

// ----------------------------------------------------------------------

// useState를 useReducer로 구현한 예제
function useStartWithUseReducer(initialState) {
  const [state, dispatch] = useReducer((prev, action) => typeof action === 'function' ? action(prev) : action);
  return [state, dispatch];
}
// useReducer 또한 useState(+useCallback)로 작성
function useReducerWithUseState(reducer, initialState, initializer) {
  const [state, setState] = useState(initializer ? ()=>initializer(initialState) : initialState);
  const dispatch = useCallback((action) => setState((prev) => reducer(prev,action)));
  return [state, dispatch];
}

// ----------------------------------------------------------------------

function Counter21({counter, inc}) {
  return <div>Counter21: {counter} <button type="button" onClick={inc}>+1</button></div>
}
function Counter22({counter, inc}) {
  return <div>Counter22: {counter} <button type="button" onClick={inc}>+1</button></div>
}
function App2() {
  const {counter, inc} = useCounter();
  return <>
    <Counter21 counter={counter} inc={inc} />
    <Counter22 counter={counter} inc={inc} />
  </>
}

// ----------------------------------------------------------------------

let state = { counter: 0, };
function get() { 
  return state; 
}
function set(nextState) {
  state = (typeof nextState === 'function') ? nextState(state) : nextState;
}
const Counter3 = () => {
  const state = get();
  const [ count, setCount ] = useState(state);
  function handleClick() {
    set((prev)=> {
      const newState = { counter: prev.counter + 1};
      setCount(newState);
      return newState;
    });
  };
  return <div>Counter3: {count.counter} <button type="button" onClick={handleClick}>+1</button></div>
}
const App3 = () => {
  const state = get();
  const [count, setCount] = useState(state);
  function handleClick() {
    set((prev) => {
      const newState = { counter: prev.counter + 1 };
      setCount(newState);
      return newState;
    });
  };
  return (
    <>
      <div>appCounter: {count.counter} <button type="button" onClick={handleClick}>+1</button> </div>
      <Counter3 />
    </>
  )
}

// ----------------------------------------------------------------------

export const createStore = (initialState) => {
  let state = typeof initialState !== 'function' ? initialState : initialState(); // store 내부에서 상태 관리
  const callbacks = new Set(); // 콜백 함수를 저장하는 곳
  const get = () => state;
  const set = (nextState) => {
    state = typeof nextState === 'function' ? nextState(state) : nextState;
    callbacks.forEach((callback) => callback()); // 값이 변경됐으므로 콜백 목록을 순회하면서 모든콜백을 실행
    return state;
  };
  const subscribe = (callback) => {
    callbacks.add(callback); // 콜백 등록
    return () => { callbacks.delete(callback); } // 클린업 실행 시 삭제해 반복적으로 추가되는 것 방지
  }
  return {get, set, subscribe};
}

const useStore = (store) => {
  console.log(store);
  const [state, setState] = useState( () => store.get() ); // 컴포넌트의 렌더링 유도
  useEffect(()=>{
    const unsubscribe = store.subscribe(()=>{ setState(store.get()); });
    return unsubscribe;
  }, [store]);
  return [state, store.set];
}
const Counter4 = (props) => {
  const { store } = props;
  const [state, setState] = useStore(store);
  function handleClick() { setState(prev => ({ counter: prev.counter + 1 })); }
  return <div>appCounter: {state.counter} <button type="button" onClick={handleClick}>+1</button></div>;
}
const store = createStore({counter: 0});
const App4 = () => {
  const [state, setState] = useStore(store);
  function handleClick() { setState(prev => ({counter: prev.counter + 1})); }
  return (
    <>
      <div>appCounter: {state.counter} <button type="button" onClick={handleClick}>+1</button></div>
      <Counter4 store={store} />
    </>
  )
}

// ----------------------------------------------------------------------

const useStoreSelector = (store, selector) => { // selector은 store에서 어떤 값을 가져올지 정의하는 함수
  const [state, setState] = useState(() => selector(store.get()));
  useEffect(()=>{
    const unsubscribe = store.subscribe(()=>{
      const value = selector(store.get());
      setState(value);
    });
    return unsubscribe;
  }, [store, selector]);
  return state;
}
const store2 = createStore({counter: 0, text: 'hi'});
const App5 = () => <> <div>useStoreSelector 사용할때</div> <Text store={store2} /> <Counter5 store={store2} /> </>; 
const Text = (props) => {
  const {store} = props;
  const text = useStoreSelector(store, useCallback(state => state.text, []));
  function handleChange(e) {
    store.set(prev => ({...prev, text: e.target.value}));
  }
  return <div> text: {text} <input value={text} onChange={handleChange} /></div>
}
const Counter5 = (props) => {
  const {store} = props;
  const counter = useStoreSelector(store, useCallback(state => state.counter, []));
  function handleClick() { store.set(prev => ({...prev, counter: prev.counter + 1})) };
  return <div>Counter5: {counter} <button type="button" onClick={handleClick}>+1</button></div>
}

export const ComponentUsesubscriptionEx = () => {
  return (
    <>
      <h3>인터넷 예제 https://velog.io/@taemin-jang/React-Hook%EA%B3%BC-%EC%83%81%ED%83%9C%EA%B4%80%EB%A6%AC</h3>
      <br /><br />===== useState로 useCounter라는 Custom Hook을 만든 코드 
      <br />(훅이 있으면 비슷한 컴포넌트를 만들때 반복되는 소스를 줄일 수 있다)
      <App1 />
      <br /><br />===== useState, useReducer 서로 구현가능함, 지역상태 관리를 위해 만들어짐
      <br /> 즉, 지역상태는 해당컴포넌트 내에서만 유효한 값이고 이를 동일하게 바라보게 하기 위해선, 위로 끌어올리기 props를 써야함
      <br /><br />===== state 끌어올리기 (두개의 값이 공유됨, props 활용)
      <br /> 만약, 공유해야하는 값을 가진 두 컴포넌트가 최상위였다면.. 구조를 다시 재설계해야하거나 Props Drilling(Props를 상위에서 하위로 전달) 이슈 발생
      <App2 />
      <br /><br />===== useState의 상태를 바깥으로 분리 (리액트에서 동작안함, 리렌더링 문제)
      <br /> 그러면, useState를 리렌더링하는 역할로 잡고 상태를 외부파일에서 관리
      <br /> 이러면, 값이 원하는데로 컨트롤 안됨 = 꼬여 있음
      <App3 />
      <br /><br />===== 외부상태관리 createStore + useStore
      <br /> 이제 원하는대로 작동함, 하지만 store값이 변경되면 무조건 리렌더링 발생 문제
      <App4 />
      <br /><br />===== useStore에서 원하는 값만 리렌더링 useStoreSelector 
      <App5 />
    </>
  )
} 