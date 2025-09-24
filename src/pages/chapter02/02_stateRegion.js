import React, {useState} from 'react';

const AdditionalInfo = () => {
  return <p>Some information</p>
}

const Component1 = ({count, setCount}) => {
  // const [count, setCount] = useState(0);
  return (
    <div>
      {count} <button onClick={()=>setCount((c) => c + 1)}>Increment Count</button>
      <AdditionalInfo />
    </div>
  )
}
const Component12 = ({count, setCount, additionalInfo}) => {
  return (
    <div>
      {count} <button onClick={()=>setCount((c) => c + 1)}>Increment Count</button>
      {additionalInfo}
    </div>
  )
}
const Component13 = ({count, setCount, children}) => {
  return (
    <div>
      {count} <button onClick={()=>setCount((c) => c + 1)}>Increment Count</button>
      {children}
    </div>
  )
}

const Component2 = ({count, setCount}) => {
  // const [count, setCount] = useState(0);
  return (
    <div>
      {count} <button onClick={()=>setCount((c) => c + 1)}>Increment Count</button>
    </div>
  )
}

// Parent 내에 카운트가 올라갈때마다 AdditionalInfo 도 계속 리렌더링 일어남. (불필요함)
const Parent = () => {
  const [count, setCount] = useState(0);
  return (
    <div>
      <Component1 count={count} setCount={setCount} />
      <Component2 count={count} setCount={setCount} />
    </div>
  )
}
const Parent2 = ({additionalInfo}) => {
  const [count, setCount] = useState(0);
  return (
    <div>
      <Component12 count={count} setCount={setCount} additionalInfo={additionalInfo} />
      <Component2 count={count} setCount={setCount} />
    </div>
  )
}
const Parent3 = ({additionalInfo, children}) => {
  const [count, setCount] = useState(0);
  return (
    <div>
      <Component13 count={count} setCount={setCount} additionalInfo={additionalInfo}>{children}</Component13>
      <Component2 count={count} setCount={setCount} />
    </div>
  )
}

const GrandParent = () => {
  return <Parent2 additionalInfo={<AdditionalInfo />} />
}
const GrandParent2 = () => {
  return <Parent3><AdditionalInfo /></Parent3>
}


// 지역 상태를 효과적으로 사용하는 방법
// 상태 끌어올리기 (Liftion State Up)
// 내용 끌어올리기 (Liftion Content Up)
export const StateRegion = () => {
  return (
    <div>
      <h3>지역 상태를 효과적으로 사용하는 방법</h3>
      <div>=====================기본 렌더링 3개</div>
      <Parent />
      <br /><br /><div>===================== 렌더링 2개</div>
      <GrandParent />
      <br /><br /><div>===================== 렌더링 2개 + 확장성</div>
      <GrandParent2 />
    </div>
  )
}