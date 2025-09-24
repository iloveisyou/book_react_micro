import React, {createContext, useContext, useRef, useEffect, memo, useState} from 'react';

const ColorContext = createContext('black');
const ColorCompoent = () => {
  const color = useContext(ColorContext);
  const renderCount = useRef(1);

  useEffect(() => { renderCount.current += 1; });
  return (
    <div style={{'background' : color, 'color' : '#888888' }}>Hello {color} (renders: {renderCount.current})</div>
  )
}
const MemoedColorComponent = memo(ColorCompoent);

const DummyComponent = () => {
  const renderCount = useRef(1);
  useEffect(()=> { renderCount.current += 1; } );
  return <div>Dummy (renders: {renderCount.current})</div>
}
const MemoedDummyComponent = memo(DummyComponent);

const Parent = () => (
  <ul>
    <li><DummyComponent /></li>
    <li><MemoedDummyComponent /></li>
    <li><ColorCompoent /></li>
    <li><MemoedColorComponent /></li>
  </ul>
);

const App = () => {
  const [color, setColor] = useState('red');
  return (
    <ColorContext.Provider value={color}>
      <input value={color} onChange={(e) => setColor(e.target.value)} />
      <Parent />
    </ColorContext.Provider>
  )
}

const CountContext = createContext({count1: 0, count2: 0});
const Counter1 = () => {
  const { count1 } = useContext(CountContext);
  const renderCount = useRef(1);
  useEffect(()=> { renderCount.current += 1; } );
  return <div>Count1: {count1} (renders: {renderCount.current})</div>;
}
const MemoedCounter1 = memo(Counter1);

const Counter2 = () => {
  const { count2 } = useContext(CountContext);
  const renderCount = useRef(1);
  useEffect(()=> { renderCount.current += 1; } );
  return <div>Count2: {count2} (renders: {renderCount.current})</div>;
}
const MemoedCounter2 = memo(Counter2);

// div 없이 바로 이어지는 <>인 경우 memo 안됨 태그로 한번 감싸줘야 함
// 최상의는 무조건 렌더링 되는 듯 그리고 해당 하위 컴포넌트들 보고 메모면 렌더링 안함 신기방기 ★★★★★★
const Parent2 = () => <div> <MemoedCounter1 /> <MemoedCounter2 /> <DummyA /> <DummyB /> <MemoedDummyB /></div>

const DummyA = () => <div>aaaaaaaaaaaaaa</div>;
const DummyB = () => <div>bbbbbbbbbbbbbb</div>;
const MemoedDummyB = memo(DummyB);

const App2 = () => {
  const [count1, setCount1] = useState(0);
  const [count2, setCount2] = useState(0);
  return (
    <CountContext.Provider value={{ count1, count2 }}>
      <button type="button" onClick={()=>setCount1((c)=>c+1)}>{count1} / +1</button>
      <button type="button" onClick={()=>setCount2((c)=>c+1)}>{count2} / +1</button>
      <Parent2 />
      
    </CountContext.Provider>
  )
}

export const ComponentUsecontext2 = () => {
  return (
    <div>
      <h3>컨텍스트 이해하기</h3>
      <br /><br /><div>===== 컨텍스트 전파의 작동 방식</div>
      <ColorCompoent />
      <br /><br /><div>===== 컨텍스트 전파의 작동 방식 - memo 메이제이션된 컴포넌트(2,4 메모, 내부가 바뀌면 어쩔순 없음)</div>
      <App />
      <br /><br /><div>===== 컨텍스트에 객체를 사용할 때의 한계점 (추가적인 리렌더링)</div>
      <App2 />
    </div>
  )
} 