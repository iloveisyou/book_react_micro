import React, { createContext, useContext, useState, useReducer, useEffect, useCallback } from 'react';

// type CountContextType = [ number, Dispatch<SetStateAction<number>>];
// const Count1Context = createContext<CountContextType | null>(null);
const Count1Context = createContext(null);
export const Count1Provider = ({children}) => (<Count1Context.Provider value={useState(0)}>{children}</Count1Context.Provider>);
export const useCount1 = () => {  
  const value = useContext(Count1Context);
  if(value === null) throw new Error('Provider missing');
  return value;
}
// const Count2Context = createContext<CountContextType | null>(null);
const Count2Context = createContext(null);
export const Count2Provider = ({children}) => ( <Count2Context.Provider value={useState(0)}>{children}</Count2Context.Provider> )
export const useCount2 = () => {
  const value = useContext(Count2Context);
  if(value === null) throw new Error('Provider missing');
  return value;
}
const Counter1 = () => {
  const [count1, setCount1] = useCount1();
  return <div>Count1: {count1} <button type="button" onClick={()=>setCount1((c)=>c+1)}>+1</button></div>;
}
const Counter2 = () => {
  const [count2, setCount2] = useCount2();
  return <div>Count2: {count2} <button type="button" onClick={()=>setCount2((c)=>c+1)}>+1</button></div>;
}
const Parent = () => <div> <Counter1 /> <Counter1 /> <Counter2 /> <Counter2 /> </div>;
const App = () => (
  <Count1Provider>
    <Count2Provider>
      <Parent />
    </Count2Provider>
  </Count1Provider>
);


// const createStateContext = (useValue: (init) => State,) => {
const createStateContext = (useValue) => {
  const StateContext = createContext(null);
  const StateProvider = ({initialValue, children}) => <StateContext.Provider value={useValue(initialValue)}>{children}</StateContext.Provider>;
  const useContextState = () => {
    const value = useContext(StateContext);
    if(value === null) throw new Error('Provider missing');
    return value;
  };
  // return [StateProvider, useContextState] as const;
  return [StateProvider, useContextState];
}
const useNumberState = (init) => useState(init || 0);
// const useMyState = () => useReducer({}, (prev, action)=>{ if(action.type === 'SET_FOO') { return { ...prev, foo: action.foo } /* ... useReducer을 활용해서도 만들수 있음, 예시 */ } })
const [Count3Provider, useCount3] = createStateContext(useNumberState);
const [Count4Provider, useCount4] = createStateContext(useNumberState);
const Counter3 = () => {
  const [count3, setCount3] = useCount3();
  return <div>Count3: {count3} <button type="button" onClick={()=> setCount3(c => c+1)}>+1</button></div>
}
const Counter4 = () => {
  const [count4, setCount4] = useCount4();
  return <div>Count4: {count4} <button type="button" onClick={()=> setCount4(c => c+1)}>+1</button></div>
}
const Parent2 = () => <div><Counter3 /><Counter3 /><Counter4 /><Counter4 /></div>
const App2 = () => <Count3Provider><Count4Provider><Parent2 /></Count4Provider></Count3Provider>


const useMyState = (initialState = { count1: 0, count2: 0 }) => {
  const [state, setState] = useState(initialState);
  useEffect(()=> console.log('updated', state));
  const inc1 = useCallback(()=>{
    setState(prev=>({...prev, count1: prev.count1 + 1}));
  },[]);
  const inc2 = useCallback(()=>{
    setState((prev)=>({...prev, count2: prev.count2 + 1}));
  });
  return [state, {inc1, inc2}];
}
const MyState1Provider = createContext();
const MyState = () => {
  const [state, setState] = useMyState();
  return <MyState1Provider value={state}>MyState</MyState1Provider>;
}
const App3 = () => <MyState />


// const createStateContext = <Value, State>(useValue: (init?: Value) => State) => {
const createStateContext2 = (useValue) => {
  // const StateContext = createContext<State | null>(null);
  const StateContext = createContext(null);
  // const StateProvider = ({initialValue, children}: {initialValue?: Value; children?: ReactNode;}) => {
  const StateProvider = ({initialValue, children}) => <StateContext.Provider value={useValue(initialValue)}>{children}</StateContext.Provider>;
  const useContextState = () => {
    const value = useContext(StateContext);
    if(value === null) { throw new Error('provider missing'); };
    return value;
  }
  // return [StateProvider, useContextState] as const;
  return [StateProvider, useContextState];
}
// const useNumberState2 = (init?: number) => useState(init || 0);
const useNumberState2 = (init) => useState(init || 0);
const [Count5Provider, useCount5] = createStateContext2(useNumberState2);
const Count5 = () => {
  const [count5, setCount5] = useCount5();
  return <div>Count5: {count5} <button  type="button" onClick={()=>setCount5(c=>c+1)}>+1</button></div>
}
const Parent3 = () => <div><Count5 /><Count5 /></div>
const App4 = () => <Count5Provider><Parent3 /></Count5Provider>

export const ComponentUsecontext5 = () => {
  return (
    <div>
      <h3>컨텍스트 사용을 위한 모범 사례</h3>
      <br /><br /><div>===== 사용자 정의 훅과 공급자 컴포넌트 만들기</div>
      <App />
      <br /><br /><div>===== 사용자 정의 훅이 있는 팩토리 패턴</div>
      <App2 />
      <br /><br /><div>===== 사용자 정의 훅이 있는 팩토리 패턴 - 더복잡한 훅</div>
      <App3 />
      <br /><br /><div>===== 사용자 정의 훅이 있는 팩토리 패턴 - 타입스크립에서도 잘 작동(해당소스는 아님,변형함)</div>
      <App4 />
    </div>
  )
}