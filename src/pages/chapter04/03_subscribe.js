import React, { useState, useEffect } from 'react';

// const createStore = <T extends unknown>(initialState: T): Store<T> => {
export const createStore = (initialState) => {
  let state = initialState;
  // const callbacks = new Set<()=> void>();
  const callbacks = new Set();
  const getState = () => state;
  // const setState = (nextState: T | ((prev: T) => T)) => {
  const setState = (nextState) => {
    // state = typeof nextState === 'function' ? (nextState as (prev: T) => T)(state) : nextState;
    state = (typeof nextState === 'function') ? nextState(state) : nextState;
  };
  // const subscribe = (callback: () => void) => {
  const subscribe = (callback) => {
    callbacks.add(callback);
    return () => { callbacks.delete(callback); }
  }
  // console.log('subscribe', subscribe())
  return { getState, setState, subscribe };
}

const store = createStore({count: 0});
// console.log(store.getState());
// store.setState({count: 1});
// console.log(store.getState());
// store.setState({count: 3});
// console.log(store.getState());
// store.subscribe();


export const useStore = (store) => {
  const [state, setState] = useState(store.getState());
  // console.log(store);
  // console.log(state);
  // console.log(store.getState());
  useEffect(()=>{
    const unsubscribe = store.subscribe(()=>{ setState(store.getState()) });
    setState(store.getState());
    return unsubscribe;
  },[store]);
  return [state, setState];
}

const Component1 = () => {
  const [state, setState] = useStore(store);
  const inc = () => {
    setState((prev) => ({...prev, count: prev.count + 1}));
    // setState(()=>({count: 3}));
    // console.log(setState(1));
    // store.setState({count:3});
    // setState({count:3})
    // console.log(state);
  };
  return <div>{state.count} <button type="button" onClick={inc}>+1</button></div>
}
const Component2 = () => {
  const [state, setState] = useStore(store);
  const inc2 = () => {
    setState((prev) => ({...prev, count: prev.count + 2,}));
  };
  return <div>{state.count} <button type="button" onClick={inc2}>+2</button></div>
}
const App = () => <div><Component1 /><Component2 /></div>;


export const ComponentSubscribe = () => {
  return (
    <div>
      <h3>기초적인 구독 추가하기</h3>
      <br /><br /><div>===== createStore 만들기</div>
      <br /><br /><div>===== useStore 만들기 (책이 오타.....개고생함)</div>
      <App />
    </div>
  )
}