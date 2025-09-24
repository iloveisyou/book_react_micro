import React, {createContext, useContext, useState, createElement} from 'react';


// const createStateContext = <Value, State>(useValue: (init?: Value) => State) => {
const createStateContext = (useValue) => {
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
const useNumberState = (init) => useState(init || 0);


const [Count1Provider, useCount1] = createStateContext(useNumberState);
const [Count2Provider, useCount2] = createStateContext(useNumberState);
const [Count3Provider, useCount3] = createStateContext(useNumberState);
const [Count4Provider, useCount4] = createStateContext(useNumberState);
const [Count5Provider, useCount5] = createStateContext(useNumberState);

const Count1 = () => {
  const [count1, setCount1] = useCount1();
  return <div>Count1: {count1} <button  type="button" onClick={()=>setCount1(c=>c+1)}>+1</button></div>
}
const Count2 = () => {
  const [count2, setCount2] = useCount2();
  return <div>Count2: {count2} <button  type="button" onClick={()=>setCount2(c=>c+1)}>+1</button></div>
}
const Count3 = () => {
  const [count3, setCount3] = useCount3();
  return <div>Count3: {count3} <button  type="button" onClick={()=>setCount3(c=>c+1)}>+1</button></div>
}
const Count4 = () => {
  const [count4, setCount4] = useCount4();
  return <div>Count4: {count4} <button  type="button" onClick={()=>setCount4(c=>c+1)}>+1</button></div>
}
const Count5 = () => {
  const [count5, setCount5] = useCount5();
  return <div>Count5: {count5} <button  type="button" onClick={()=>setCount5(c=>c+1)}>+1</button></div>
}
const Parent = () => <div><Count1 /><Count2 /><Count3 /><Count4 /><Count5 /></div>

const App = () => (
  <Count1Provider initialValue={10}>
    <Count2Provider initialValue={20}>
      <Count3Provider initialValue={30}>
        <Count4Provider initialValue={40}>
          <Count5Provider initialValue={50}>
            <Parent />
          </Count5Provider>
        </Count4Provider>
      </Count3Provider>
    </Count2Provider>
  </Count1Provider>
)

const App2 = () => {
  const providers = [
    [Count1Provider, { initialValue: 10 }],
    [Count2Provider, { initialValue: 20 }],
    [Count3Provider, { initialValue: 30 }],
    [Count4Provider, { initialValue: 40 }],
    [Count5Provider, { initialValue: 50 }],
  ];
  return providers.reduceRight((children, [Component, props])=>createElement(Component, props, children), <Parent />)
}

export const ComponentUsecontext6 = () => {
  return (
    <div>
        <h3>reduceRight를 이용한 공급자 중첩방지</h3>
        <br /><br /><div>===== 여러 상태 만들고, 중첩이 너무 많으면 트리구조는 복잡함</div>
        <App />
        <br /><br /><div>===== 코딩 스타일 완화 (리팩터링)</div>
        <App2 />
    </div>
  )
}