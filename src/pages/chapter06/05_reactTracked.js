import React, { createContext, useState, useContext } from 'react';
import { createContainer } from 'react-tracked';

const initialNameState = {firstName: 'react', lastName: 'hooks'};
const useNameState = () => useState(initialNameState);
// export const { Provider: SharedStateProvider, useTracked: useSharedState } = createContainer(useNameState);

const NameContext = createContext([{firstName: 'react', lastName: 'hooks'}, () => {}]);
const NameProvider = ({children}) => (
  <NameContext.Provider value={useState({firstName: 'react', lastName: 'hooks'})}>
    {children}
  </NameContext.Provider>
);
const useFirstName = () => { // useContact(nameContact) 사용
  const [{firstName}] =  useContext(NameContext);
  return <>{firstName}</>;
}
// const useLastName = () => { // useContact(nameContact) 대신 useTracked 사용
//   const [{lastName}] = useTracked();
//   return <>{lastName}</>;
// }

// ---------------------------------------------------------------------- 변경가능한 갱신으로 코드 줄이기 전 : createContext

const useValue = () => useState({ count: 0, text: 'hello' });
const StateContext = createContext(null);
const Provider2 = ({children}) => (<StateContext.Provider value={useValue()}>{children}</StateContext.Provider>);
const useStateContext = () => {
  const contextValue = useContext(StateContext);
  if(contextValue === null) { throw new Error('Please use Provider'); }
  return contextValue;
}
const Counter = () => {
  const [state, setState] = useStateContext();
  const inc = () => setState(prev => ({...prev, count: prev.count + 1}));
  return <div>count: {state.count} <button onClick={inc}>+1</button></div>
}
const TextBox = () => {
  const [state, setState] = useStateContext();
  const setText = (text) => setState(prev => ({...prev, text}));
  return (<div><input value={state.text} onChange={e=>setText(e.target.value)} /></div>)
}
const App = () => (<Provider2>
  <Counter />
  <Counter />
  <TextBox />
  <TextBox />
</Provider2>);

// ---------------------------------------------------------------------- 변경가능한 갱신으로 코드 줄이기 후 : useTracked

const useValue2 = () => useState({ count: 0, text: 'hello' });
const { Provider, useTracked } = createContainer(useValue2);
const Counter2 = () => {
  const [state, setState] = useTracked();
  const inc = () => { setState(prev => ({...prev, count: prev.count + 1})) };
  return (<div> count: {state.count} <button type="button" onClick={inc}>+1</button> </div>) 
}
const TextBox2 = () => {
  const [state, setState] = useTracked();
  const setText = (text) => { setState(prev => ({...prev, text})) };
  return (<div> <input value={state.text} onChange={e=>setText(e.target.value)} /> </div>)
}
const App2 = () => (<Provider>
  <Counter2 />
  <Counter2 />
  <TextBox2 />
  <TextBox2 />
</Provider>);

// ---------------------------------------------------------------------- 원본소스

// const useValue = () => useState({ count: 0, text: "hello" });
// const { Provider, useTracked } = createContainer(useValue);

const Counter3 = () => {
  const [state, setState] = useTracked();
  const inc = () => {
    setState((prev) => ({ ...prev, count: prev.count + 1 }));
  };
  return (
    <div>
      count: {state.count} <button onClick={inc}>+1</button>
    </div>
  );
};

const TextBox3 = () => {
  const [state, setState] = useTracked();
  const setText = (text) => {
    setState((prev) => ({ ...prev, text }));
  };
  return (
    <div>
      <input value={state.text} onChange={(e) => setText(e.target.value)} />
    </div>
  );
};

const App3 = () => (
  <Provider>
    <div>
      <Counter3 />
      <Counter3 />
      <TextBox3 />
      <TextBox3 />
    </div>
  </Provider>
);


export const ComponentReactTracked = () => {
  return (
    <div>
      <h3>10 사용사례 시나리오 4: React Tracked</h3>
      <br /> 속성감지를 기반으로 자동으로 렌더링 최적화를 수행, 상태사용추적라이브러리
      <br /> Valtio와 비슷하게 불필요한 리렌더링 제거 기능 제공
      <br /> 다른 상태관리 라이브러리와 함께사용 - useState, useReducer -> Redux, Zustand 등 과 유사한 라이브러리
      <br /> 두가지 사용법, 1. useState와 함께 사용하는 방법 2. React Redux와 함께 사용하는 방법
      <br /> React Tracked - 상태관리X, 렌더링최적화만 제공 (상태사용추적)
      
      <br /> 상태사용추적 사례 - 리액트 컨텍스트 -> 대신 useTracked 사용 (사용법같음,상태사용추적)
      <br /> ㄴ자동 렌더링 최적화 -> 상태 사용 추적 - proxy-compare라는 내부라이브러리 사용
      {useFirstName()} / useLastName()

      <br /><br /><div>&diams; <strong>useState, useReducer와 함께 React Tracked 사용하기</strong></div>
      <br /> React Tracked는 주로 리액트 컨텍스트를 대체할 용도로 사용
      <br /> 사용법1. useState와 함께 React Tracked 사용하기
      <App />
      <br /> &uarr;&uarr;&uarr; 속성 하나만 바뀌어도 다 바뀜 + 불필요한리렌더링 / &darr;&darr;&darr; React Tracked 사용
      <App2 />
      <br /> 책원본 소스
      <App3 />


    
      <br /><br /><br /><br /><br /><br /><br /><br />
    </div>
  )
}