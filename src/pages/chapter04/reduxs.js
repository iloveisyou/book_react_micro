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
  return { getState, setState, subscribe };
}

export const useStore = (store) => {
  const [state, setState] = useState(store.getState());
  useEffect(()=>{
    const unsubscribe = store.subscribe(()=>{ setState(store.getState()) });
    setState(store.getState());
    return unsubscribe;
  },[store]);
  return [state, setState];
}