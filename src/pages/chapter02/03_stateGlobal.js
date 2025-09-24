import React, {useState} from 'react';

// 전역 상태 사용하기
// 싱글턴이 아닌 전역상태 작동방법
const createContainer = () => {
  let base = 1;
  const addBase = (n) => n + base;
  const changeBase = (b) => { base = b; }
  return { addBase, changeBase };
};

const container1 = createContainer();
const container2 = createContainer();

container1.changeBase(10);
console.log(container1.addBase(2));
console.log(container2.addBase(2));

// props을 전달하는 것이 적절하지 않을때... 너무 많은 단계
const Component1 = ({ count, setCount }) => {
  return (
    <div>
      <div>Component1</div>
      {count} <button type="button" onClick={() => setCount((c) => c + 1)}>Increment Count</button>
    </div>
  )
}
const Parent = ({count, setCount}) => {
  return (
    <>
      <div>Parent</div>
      <Component1 count={count} setCount={setCount} />
    </>
  )
}
const GrandParent = ({count, setCount}) => {
  return (
    <>
      <div>GrandParent</div>
      <Parent count={count} setCount={setCount} />
    </>
  )
}
const Root = () => {
  const [count, setCount] = useState(0);
  return (
    <>
      <div>Root</div>
      <GrandParent count={count} setCount={setCount} />
    </>
  )
}


export const StateGlobal = () => {
  return (
    <div>
      <h3>언제 전역상태를 사용할가?</h3>
      <div>====== props을 전달하는 것이 적절하지 않을 때</div>
      <Root />
    </div>
  )
}