import React, {createContext, useContext, useRef, useMemo} from 'react';
import { useSubscription } from 'use-subscription';

const createStore = (initialState) => {
  let state = initialState;
  const callbacks = new Set();
  const getState = () => state;
  const setState = (nextState) => {
    state = typeof nextState === 'function' ? nextState(state) : nextState;
    callbacks.forEach((callback) => callback());
  };
  const subscribe = (callback) => {
    callbacks.add(callback);
    return () => {
      callbacks.delete(callback);
    };
  }
  return { getState, setState, subscribe };
}

const StoreContext = createContext(createStore({count: 0, text: 'hello'}));

const StoreProvider = ({initialState, children}) => {
  const storeRef = useRef(); // 첫번재 렌더링에서 한번만 초기화되게 만드는데 사용
  if(!storeRef.current) { storeRef.current = createStore(initialState); }
  return (
    <StoreContext.Provider value={storeRef.current}>
      {children}
    </StoreContext.Provider>
  );
};

const useSelector = (selector) => {
  const store = useContext(StoreContext);
  return useSubscription(
    useMemo(
      ()=>({
        getCurrentValue: ()=> selector(store.getState()),
        subscribe: store.subscribe,
      }),
      [store, selector]
    )
  );
};

const useSetState = () => { // 모듈상태와 다르게 컨텍스트를 사용하여 갱신 = store에서 setState 함수를 반환하는 간단한 훅
  const store = useContext(StoreContext);
  return store.setState;
};

const selectCount = (state) => state.count; // 외부에서 정의하지 않으면 useCallback 함수로 감싸줘야하는 추가작업 발생 
// selectCount 가 내부에 있는경우 컴포넌트 리렌더링 될 때마다 useSelector의 useMmemo가 갱신됨
// 이 갱신은 useCallback를 통해 리렌더링을 막을 수 있음

const Component = () => {
  const count = useSelector(selectCount);
  const setState = useSetState();
  const inc = () => {
    setState((prev) => ({...prev, count: prev.count + 1}));
    console.log(StoreContext);
  }
  return <div>count: {count} <button type="button" onClick={inc}>+1</button></div>
}

const App = () => (
  <>
  <h4>Using default store</h4>
  <Component />
  <Component />
  <StoreProvider initialState={{count:10}}>
    <h4>Using store provider</h4>
    <Component />
    <Component />
    <StoreProvider initialState={{count:20}}>
      <h4>using inner store provider</h4>
      <Component />
      <Component />
    </StoreProvider>
    <StoreProvider initialState={{count:30}}>
      <h4>using inner store provider</h4>
      <Component />
      <Component />
    </StoreProvider>
  </StoreProvider>
  </>
);

export const ComponentContextPattern = () => {
  return (
    <>
      <h3>컨텍스트와 구독 패턴 사용하기</h3>
      <br /> Provider로 감싸면 별도의 값으로 처리 됨, 재사용성 너무 좋음
      <br /> 이패턴의 핵심은 useContext와 함께 useSubscription을 사용
      <br /> Component는 특정 스토어 객체에 연결되어 있지 않음을 주목 = 이는 다른스토어에서도 사용 가능
      <br /> 다양한 위치에서 Compoent를 가질 수 있음 - 공급자 외부, 첫번째 공급자 내부, 두번째 공급자 내부에
      <br /> App 컴포넌트에는 Component 컴포넌트가 포함 되어 있음 - StoreProvider외부, 첫번째 StoreProvider 컴포넌트 내부, 두번째로 중첩된 StoreProvider컴포넌트 내부
      <br /> 컴텍스트와 구독을 함께 사용해 전역 상태 구현, 컨텍스트로 인해 하위 트리에서 상태 분리, 구독으로 인해 리렌더링 문제 회피

      <App />
    </>
  )
}