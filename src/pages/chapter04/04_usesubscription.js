import React, { useState, useEffect, useCallback, useMemo } from 'react';
// import { useSuspense, useSubscription } from '@rest-hooks/react';
import { useSubscription } from "use-subscription";
// import { createStore } from './reduxs';


export const createStore = (initialState) => {
  let state = initialState;
  // const callbacks = new Set<()=> void>();
  const callbacks = new Set();
  const getState = () => state;
  // const setState = (nextState: T | ((prev: T) => T)) => {
  const setState = (nextState) => {
    console.log('작동1');
    // state = typeof nextState === 'function' ? (nextState as (prev: T) => T)(state) : nextState;
    state = (typeof nextState === 'function') ? nextState(state) : nextState;
    callbacks.forEach((callback) => callback());
  };
  // const subscribe = (callback: () => void) => {
  const subscribe = (callback) => {
    console.log('작동2');
    callbacks.add(callback);
    return () => { callbacks.delete(callback); }
  };
  console.log('createStore');
  // console.log('subscribe', subscribe())
  return { getState, setState, subscribe };
}

const store = createStore({count1: 0, count2: 0, count3: 0, count4: 0,});

// const useStoreSelector = <T, S>(store: Store<T>, selector: (state: T) => S) => {
export const useStoreSelector = (store, selector) => {
  console.log('요기요1',store.getState());
  console.log(selector);
  console.log(selector);
  const [state, setState] = useState(()=>selector(store.getState()));
  useEffect(()=>{
    console.log('useStoreSelector');
    const unsubscribe = store.subscribe(()=> {
      setState(selector(store.getState()));
    });
    setState(selector(store.getState()));
    // setState(store.getState());
    return unsubscribe;
  }, [store, selector]);
  return state;
}

const Component1 = () => {
  const state = useStoreSelector(store, useCallback((state)=>state.count1, []));
  const inc = () => {
    store.setState((prev)=>({...prev, count1: prev.count1 + 1,}));
    // state.setState(store.getState());
    console.log(store.getState());
  };
  return <div>count1: {state} <button type="button" onClick={inc}>+1</button></div>
}

// const selectCount2 = (state: ReturnType<typeof store.getState>) => state.count2;
const selectCount2 = (state) => state.count2;

const Component2 = () => {
  const state = useStoreSelector(store, selectCount2);
  const inc = () => {
    store.setState((prev)=>({...prev, count2: prev.count2 + 1}));
    // console.log(store.getState());
  };
  return <div>count2: {state} <button type="button" onClick={inc}>+1</button></div>
}

const App = () => <div>
    <Component1 />
    <Component1 />
    <Component2 />
    <Component2 />
  </div>;

// ----------------------------------------------------------------------

const useStoreSelector2 = (store, selector) => useSubscription(
  useMemo(()=>({
    getCurrentValue: ()=> selector(store.getState()),
    subscribe: store.subscribe,
  }), [store, selector])
);

const Component3 = () => {
  const state = useStoreSelector2(store, (state)=>state.count3);
  const inc = () => {
    store.setState((prev)=>({...prev, count3: prev.count3 + 1}));
    // console.log(store.getState());
  };
  return <div>count3: {state} <button type="button" onClick={inc}>+1</button></div>
}

// ----------------------------------------------------------------------

const Component4 = () => {
  const state = useSubscription(useMemo(()=>({
    getCurrentValue: ()=> store.getState().count4,
    subscribe: store.subscribe,
  }), []));
  const inc = () => { 
    store.setState(prev => ({...prev, count4: prev.count4 + 1,}));
    // console.log(store.getState());
  }
  return <div>count1: {state} <button type="button" onClick={inc}>+1</button></div>
}

export const ComponentUsesubscription = () => {
  return (
    <div>
      <h3>선택자와 useSubscription 사용하기</h3>
      <br /><br /><div>===== useStoreSelector 만들기 </div>
      <App />
      <br /><br /><div>===== useStoreSelector 만들기 (코드수정해도 동일하게 작동)</div>
      <Component3 />
      <br /><br /><div>===== useStoreSelector 만들기 (useStoreSelector 사용 않고)</div>
      <Component4 />
    </div>
  )
}