import React, {useState, createContext, useContext} from 'react';

// App
const Component1 = ({count, setCount, children}) => {
  return (
    <div>
      {count} <button onClick={()=>setCount((c) => c + 1)}>Increment Count</button>
      {children}
    </div>
  )
}
const Component2 = ({count, setCount}) => {
  return (
    <div>
      {count} <button onClick={()=>setCount((c) => c + 2)}>Increment Count</button>
    </div>
  )
}
const Parent = ({count, setCount}) => {
  return (
    <>
      <Component1 count={count} setCount={setCount} />
      <Component2 count={count} setCount={setCount} />
    </>
  )
}
const App = () => {
  const [count, setCount] = useState(0);
  return <Parent count={count} setCount={setCount} />;
}


// App2
const ColorContext = createContext('black');
const Component = () => {
  const color = useContext(ColorContext);
  return <div style={{ 'background': color, 'color': '#999999' }}>Hellow {color}</div>
}
const App2 = () => (
  <>
    <Component />
    <ColorContext.Provider value="red">
      <Component />
    </ColorContext.Provider>
    <ColorContext.Provider value="green">
      <Component />
    </ColorContext.Provider>
    <ColorContext.Provider value="blue">
      <Component />
      <ColorContext.Provider value="skyblue">
        <Component />
      </ColorContext.Provider>
    </ColorContext.Provider>
  </>
);


// App3
const CountStateContext = createContext({count: 0, setCount: () => {},});
const Component31 = () => {
  const { count, setCount } = useContext(CountStateContext);
  return <div> {count} <button type="button" onClick={() => setCount((c) => c + 1)}>+1</button> </div>;
}
const Component32 = () => {
  const { count, setCount } = useContext(CountStateContext);
  return <div> {count} <button type="button" onClick={() => setCount((c) => c + 2)}>+2</button> </div>;
}
const Parent3 = () => ( <> Parent3, <Component31 /> <Component32 /> </> )
const App3 = () => {
  const [count, setCount] = useState(0);
  return (
    <CountStateContext.Provider value={{count, setCount}}>
      <Parent3 />
    </CountStateContext.Provider>
  )
}

// useState와 useContext 탐구하기
// useContext 없이 useState 사용하기 (프로퍼티 내리꽂기)
export const ComponentUsecontext = () => {
  return (
    <div>
      <h3>useState와 useContext 탐구하기</h3>
      <br /><br /><div>=====useContext 없이 useState 사용하기 (프로퍼티 내리꽂기)</div>
      <App />
      <br /><br /><div>=====정적 값을 이용해 useContext 사용하기</div>
      <App2 />
      <br /><br /><div>=====useContext와 함께 useState 사용하기</div>
      <App3 />
    </div>
  )
}