import React, { createContext, useContext, useState } from 'react';

// type CountContextType = [number, Dispatch<SetStateAction<number>>];
// const Count1Context = createContext<CountContextType>([0, () => {}]);
// const Count2Context = createContext<CountContextType>([0, () => {}]);
const Count1Context = createContext({count1:0, setCount1:() => {}});
const Count2Context = createContext({count2:0, setCount2:() => {}});

const Counter1 = () => {
  const {count1, setCount1} = useContext(Count1Context);
  return (
    <div>
      Count1: {count1}
      <button onClick={()=>setCount1((c)=>c+1)}>+1</button>
    </div>
  )
}

const Counter2 = () => {
  const {count2, setCount2} = useContext(Count2Context);
  return (
    <div>
      Count2: {count2}
      <button onClick={()=>setCount2((c)=>c+1)}>+1</button>
    </div>
  )
}

const Parent =() => (
  <div>
    <Counter1 />
    <Counter1 />
    <Counter2 />
    <Counter2 />
  </div>
);

const Count1Provider = ({children}) => {
  const [count1, setCount1] = useState(0);
  return (
    <Count1Context.Provider value={{count1, setCount1}}>
      {children}
    </Count1Context.Provider>
  )
}

const Count2Provider = ({children}) => {
  const [count2, setCount2] = useState(0);
  return (
    <Count2Context.Provider value={{count2, setCount2}}>
      {children}
    </Count2Context.Provider>
  )
}

// 전역 상태를 위한 컨텍스트 만들기
// 작은 상태 조각 만들기
export const ComponentUsecontext3 = () => {
  return (
    <>
      <h3>전역 상태를 위한 컨텍스트 만들기</h3>
      <br /><br /><div>=====작은 상태 조각 만들기</div>
      <Count1Provider>
        <Count2Provider>
          <Parent />
        </Count2Provider>
      </Count1Provider>
    </>
  )
}