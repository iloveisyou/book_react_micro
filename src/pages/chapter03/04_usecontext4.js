import React, { createContext, useContext, useReducer } from 'react';

// type Action = { type: 'INC1' } | { type: 'INC2' };

// const Count1Context = createContext<number>(0)
// const Count2Context = createContext<number>(0)
// const DispatchContext = createContext<Dispatch<Action>>(()=>{});
const Count1Context = createContext(1);
const Count2Context = createContext(0);
const DispatchContext = createContext({dispatch:()=>{}});

const Counter1 = () => {
  const count1 = useContext(Count1Context);
  const dispatch = useContext(DispatchContext);
  return <div>Count1: {count1} <button type="button" onClick={()=>dispatch({type: 'INC1'})}>+1</button></div>
}

const Counter2 = () => {
  const count2 = useContext(Count2Context);
  const dispatch = useContext(DispatchContext);
  return <div>Count1: {count2} <button type="button" onClick={()=>dispatch({type: 'INC2'})}>+1</button></div>
}

const Parent = () => (
  <div>
    <Counter1 />
    <Counter1 />
    <Counter2 />
    <Counter2 />
  </div>
);

const reducer = (state, action) => {
  if(action.type === 'INC1') { return { ...state, count1: state.count1 + 1 } } 
  if(action.type === 'INC2') { return { ...state, count2: state.count2 + 1 } } 
  if(action.type === 'INC_BOTH') { return { ...state, count1: state.count1 + 1, count2: state.count2 + 1 } }
  throw new Error('no matching action');
}

const Provider = ({children}) => {
  const [ state, dispatch ] = useReducer(
    // (prev: { count1: number; count2: number }, action) => { 
    //   if(action.type === 'INC1') { return { ...prev, count1: prev.count1 + 1 } } 
    //   if(action.type === 'INC2') { return { ...prev, count2: prev.count1 + 1 } } 
    //   throw new Error('no matching action');
    // }
    reducer, { count1: 0, count2: 0 }
  );
  return (
    <DispatchContext.Provider value={dispatch}>
      <Count1Context.Provider value={state.count1}>
        <Count2Context.Provider value={state.count2}>
          {children}
        </Count2Context.Provider>
      </Count1Context.Provider>
    </DispatchContext.Provider>
  )
}

const App = () => (
  <Provider>
    <Parent />
  </Provider>
)


export const ComponentUsecontext4 = () => {
  return (
    <div>
      <h3>useReducer로 하나의 상태를 만들고 여러 개의 컨텍스트로 전파하기</h3>
      <App />
    </div>
  )
}