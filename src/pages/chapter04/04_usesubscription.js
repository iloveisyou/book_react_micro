import React, { useState, useEffect, useCallback } from 'react';
import { createStore } from './reduxs';

const store = createStore({count1: 0, count2: 0});

// const useStoreSelector = <T, S>(store: Store<T>, selector: (state: T) => S) => {
const useStoreSelector = (store, selector) => {
  const [state, setState] = useState(()=>selector(store.getState()));
  useEffect(()=>{
    const unsubscribe = store.subscribe(()=> {
      setState(selector(store.getState()));
      setState(selector(store.getState()));
    });
    setState(selector(store.getState()));
    return unsubscribe;
  }, [store, selector]);
}

const Component1 = () => {
  const state =useStoreSelector(store, useCallback((state)=>state.count1, []));
  const inc = () => {
    store.setState((prev)=>({...prev, count1: prev.count1 + 1,}));
  };
  return <div>count1: {state} <button type="button" onClick={inc}>+1</button></div>
}

const App = () => <><Component1 /></>

export const ComponentUsesubscription = () => {
  return (
    <div>
      <h3>선택자와 useSubscription 사용하기</h3>
      <br /><br /><div>===== useStoreSelector 만들기</div>
      <App />
    </div>
  )
}