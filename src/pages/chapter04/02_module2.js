import React, {useState, useEffect} from 'react';

let count = 0;
const Component1 = () => {
  const inc = () => {  count += 1; console.log(count); }
  return <div>{count} <button type="button" onClick={inc}>+1</button></div>;
}

const Component2 = () => {
  const [state, setState] = useState(count);
  const inc = () => { count += 1; setState(count) }
  return <div>{state} <button type="button" onClick={inc}>+1</button></div>
}

const Component3 = () => {
  const [state, setState] = useState(count);
  const inc2 = () => { count += 1; setState(count); }
  return <div>{state} <button type="button" onClick={inc2}>+1</button></div>
}

// ----------------------------------------------------------------------

let count2 = 0;
// const setStateFunction = new Set<(count: number) => void>();
const setStateFunctions = new Set();

const Component12 = () => {
  const [state, setState] = useState(count2);
  useEffect(()=>{
    setStateFunctions.add(setState);
    return () => { setStateFunctions.delete(setState); }
  },[]);
  const inc = () => {
    count2 += 1;
    setStateFunctions.forEach( fn => console.log(fn(count2)) );
  }
  return <div>{state} <button type="button" onClick={inc}>+1</button></div>;
}

const Component22 = () => {
  const [state, setState] = useState(count2);
  useEffect(()=>{
    setStateFunctions.add(setState);
    return () => { setStateFunctions.delete(setState); }
  },[]);
  const inc = () => {
    count2 += 1;
    setStateFunctions.forEach( fn => fn(count2) );
  }
  return <div>{state} <button type="button" onClick={inc}>+1</button></div>;
}

export const ComponentModule2 = () => {
  return (
    <div>
      <h3>리액트에서 전역 상태를 다루기 위한 모듈 상태 사용법</h3>
      <br /><br /><div>===== 간단한 예졔(실제 count는 오르지만 리렌더링이 안일어남)</div>
      <Component1 />
      <br /><br /><div>===== 리렌더링이 일어나게 할려면 useState, useReducer 사용</div>
      <Component2 />
      <br /><br /><div>===== 2번째랑 이곳은 같은 count를 사용하지만 별개로 리렌더링과 다른 count 은 공유하되 현재 값은 다름</div>
      <Component3 />
      <br /><br /><div>===== 2번째랑 불일치 발생의 해결책, 좋은코드는 아님, 중복코드 있음</div>
      <Component12 />
      <Component22 />
    </div>
  )
}