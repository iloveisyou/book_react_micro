import React, {useState, useEffect} from 'react';
// import {useStore} from 'react-redux';
// import { useStore } from '../chapter04/03_subscribe'


export const createStore = (initialState) => {
  let state = initialState;
  const callbacks = new Set();
  const getState = () => state;
  const setState = (nextState) => {
    state = typeof nextState === 'function' ? nextState(state) : nextState;
    callbacks.forEach((callback) => callback());
  }
  const subscribe = (callback) => {
    callbacks.add(callback);
    return () => { callbacks.delete(callback); }
  }
  return {getState, setState, subscribe}
}

const store = createStore({count: 0});

export const useStore = (store) => {
  const [state, setState] = useState(store.getState());
  useEffect(()=>{
    const unsubscribe = store.subscribe(()=> setState(store.getState()));
    setState(store.getState());
    return unsubscribe;
  }, [store]);
  // return [state, setState]; // 불러오는 값을 각각 다르게 처리함
  return [state, store.setState]; // 불러오는 값을 모두 동일하게 처리함
} 

const Counter = () => {
  const [state, setState] = useStore(store);
  const inc = () => {
    setState((prev) => ({...prev, count: prev.count + 1}));
  };
  return <div> Count: {state.count} <button type="button" onClick={inc}>+1</button></div>
}

const Component = () => (<><Counter /> <Counter /></>);

// ----------------------------------------------------------------------

const store2 = createStore({count: 0});

const Counter2 = () => {
  const [state, setState] = useStore(store2);
  const inc = () => {
    setState((prev) => ({...prev, count: prev.count + 1,}));
  }
  return <div> Count2: {state.count} <button type="button" onClick={inc}>+1</button></div>
}

const Component2 = () => <><Counter2 /><Counter2 /></>

// ----------------------------------------------------------------------

// 의사코드 
/*const Componet31 = () => (<StoreProvider><Counter /><Counter /></StoreProvider>)
const Componet32 = () => (<Store2Provider><Counter /><Counter /></Store2Provider>)
const Componet33 = () => (<Store3Provider><Counter /><Counter /></Store3Provider>)*/


export const ComponentModuleState = () => {
  return (
    <div>
      <h3>모듈상태의 한계</h3>
      <br /><br /><div>===== 상태를 공유하는 한쌍의 Count 컴포넌트 - store를 사용하려면 useStore를 사용 </div>
      <Component />
      <br /><br /><div>===== store2를 추가해서 한쌍을 더 만듬, store3..4.. 계속 추가적으로 필요로하는 불편함 </div>
      <br /> Counter은 재사용 가능해야하지만... 모듈 상태를 외부에서 정의하기 때문에 재사용 불가능, 모듈의 한계
      <br /> props 에 store를 넣으면 Counter 컴포넌트를 재사용 가능하지만... prop drilling가 엄청 많이 사용하게 됨, 모듈은 이를 피하기 위한 것
      <Component2 />
      <br /><br /><div>===== Component3과 같이 Provider 컴포넌트 가 있다. 이 위치가 컨텍스트를 사용하면 이상적인 위치 = 패턴</div>
    </div>
  )
}