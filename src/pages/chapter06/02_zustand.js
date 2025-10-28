import React, { memo, useState, useEffect } from 'react';
import { create } from 'zustand';


export const store = create(()=>({ count: 0 }));
console.log('store1_1: ', store.getState());
store.setState({ count: 1 });
console.log('store1_2: ', store.getState());

const state1 = store.getState();
console.log('store2_1: ', state1);
state1.count = 2; // 잘못됨, 불변성을 무시하는 행위, 제대로 동작 안할 수 있음
store.setState(state1); 
console.log('store2_2: ', state1);
console.log('store2_3: ', store.getState());
// 여러 속성을 추가 가능하고, 불변으로 변경
export const store3 = create((set)=>({ 
  count: 0, text: 'hello', 
  // test: () => set(state => ({count: state.count + 3})),
}));
console.log('store3_1', store3.getState());
store3.setState({count:1, text: 'hello'});
console.log('store3_2', store3.getState());
store3.setState({count: 2});
console.log('store3_3', store3.getState());

const obj1 = { a: 1, c: 3, };
const obj2 = { b: 2, c: 4, };
console.log('Object.assign', Object.assign({}, obj1, obj2));

store3.subscribe(() => {
  console.log('store state is change');
})
store3.setState({count: 3});
console.log('store4_1', store3.getState());

// ----------------------------------------------------------------------

export const useStore = create(() => ({ count: 0, text: 'hello' }));

const Component = () => {
  const { count, text } = useStore();
  return <div> count: {count} </div>;
}

const Component2 = () => {
  const count = useStore((state)=> state.count);;
  return <div> count: {count} </div>;
}

const Component3 = () => {
  const [{ count }] = useStore(
    (state) => [{count: state.count}]
  );
  return <div> count: {count} </div>;
}

// ----------------------------------------------------------------------

const useStore2 = create(() => ({ count1: 0, count2: 0, }));

const selectCount1 = (state) => state.count1;

const Counter1 = () => {
  const count1 = useStore2(selectCount1);
  const inc1 = () => useStore2.setState((prev) => ({ count1: prev.count1 + 1 }));
  return <div>count1: {count1} <button type="button" onClick={inc1}>+1</button></div>
}

// ----------------------------------------------------------------------

const useStore3 = create((set) => ({
  count1: 0, count2: 0,
  inc1: () => set( prev => ({ count1: prev.count1 + 1})),
  inc2: () => set( prev => ({ count2: prev.count2 + 1})),
}));

const selectCount2 = (state) => state.count2;
const selectInc2 = (state) => state.inc2;

const Counter2 = () => {
  const count2 = useStore3(selectCount2);
  const inc2 = useStore3(selectInc2);
  return <>
  <div>count2: {count2} <button type="button" onClick={inc2}>+1</button></div>
  </>
}

const Total = () => {
  const count1 = useStore3(selectCount1);
  const count2 = useStore3(selectCount2);
  return <div> total: {count1 + count2}</div>
}

const selectTotal = (state) => state.count1 + state.count2;

const Total2 = () => {
  const total = useStore3(selectTotal);
  return <div> total: {total}</div>
}

const useStore4 = create((set) => ({
  count1: 0, count2: 0, total: 0,
  inc1: () => set( prev => ({ ...prev, count1: prev.count1 + 1, total: prev.count1 + 1 + prev.count2})),
  inc2: () => set( prev => ({ ...prev, count2: prev.count2 + 1, total: prev.count2 + 1 + prev.count1})),
}));
const Counter3 = () => {
  const count1 = useStore4(state => state.count1);
  const inc1 = useStore4(state => state.inc1);
  return <>
  <div>count1: {count1} <button type="button" onClick={inc1}>+1</button></div>
  </>
}
const Counter4 = () => {
  const count2 = useStore4(state => state.count2);
  const inc2 = useStore4(state => state.inc2);
  return <>
  <div>count2: {count2} <button type="button" onClick={inc2}>+1</button></div>
  </>
}
const Total3 = () => {
  const total = useStore4(state => state.total);
  return <>
  <div>total: {total}</div>
  </>
}

const App = () => <><Counter3 /> <Counter4 /> <Total3 /> </>

// ---------------------------------------------------------------------- Todo 예제

let nextId = 0;
const useStore5 = create((set) => ({
  todos: [],
  addTodo: (title) => set( (prev) => ({ todos: [...prev.todos, { id: ++nextId, title, done: false }] })),
  removeTodo: (id) => set( (prev) => ({ todos: prev.todos.filter(todo => todo.id !== id) })),
  toggleTodo: (id) => set( (prev) => ({ todos: prev.todos.map((todo => todo.id === id ? { ...todo, done: !todo.done } : todo)) })),
}));
const selectRemoveTodo = state => state.removeTodo;
const selectToggleTodo = state => state.toggleTodo;
const TodoItem = ({todo}) => {
  const removeTodo = useStore5(selectRemoveTodo);
  const toggleTodo = useStore5(selectToggleTodo);
  return <div>
    <input type="checkbox" checked={todo.done} onChange={() => toggleTodo(todo.id)} />
    <span style={{textDecoration: todo.done ? "line-through" : "none"}}>{todo.title}</span>
    <button type="button" onClick={() => removeTodo(todo.id)}>Delete</button>
  </div>
}
const MemoedTodoItem = memo(TodoItem);
// const MemoedTodoItem = TodoItem;
const selectTodos = state => state.todos;
const TodoList = () => {
  const todos = useStore5(selectTodos);
  return <div>{todos.map(todo => <MemoedTodoItem key={todo.id} todo={todo} />)}</div>
}
const selectAddTodo = state => state.addTodo;
const NewTodo = () => {
  const addTodo = useStore5(selectAddTodo);
  const [text, setText] = useState('');
  const onClick = () => { addTodo(text); setText(''); };
  return <div>
    <input value={text} onChange={e => setText(e.target.value)} />
    <button type="button" onClick={onClick} disabled={!text}>Add</button>
  </div>
}
const App2 = () => <> <TodoList /> <NewTodo /> </>

// ----------------------------------------------------------------------

const countObj = { value: 0 };
const Component4 = () => {
  const [ count, setCount ] = useState(countObj);
  const handleClick = () => { countObj.value +=1; setCount(countObj); };
  useEffect(() => {
    console.log('component update');
  });
  return <div>{count.value} <button type="button" onClick={handleClick}>Update</button></div>
}

export const ComponentZustand = () => {
  return (
    <div>
      <h3>사용사례 시나리오 1: Zustand (주스탠드, 독일어로 상태, v3,v4, / 대괄호)</h3>
      <br /> 상태 객체를 수정할수 없고 항상 새로 만들어야 하는 불변 갱신 모델을 기반
      <br /> 선택자를 사용해 수동으로 렌더링 최적화
      <br /> 간단하면서도 강력한 store 생성자 인터페이스
      <br /> store (getState, setState, subscribe)

      <br /><br /><div>&diams; <strong>모듈 상태와 불변 상태 이해하기</strong></div>
      <br />불변성을 무시하는 state1.count = 2; store.setState(state1); 이런건 안됨 
      <br /> -> 새로운 객체를 이용해 갱신 store.setState( / count: 2 / )
      <br /> -> 또는 함수를 이용해 갱신 store.setState((prev)=>( / count: pre.count + 1 / ));
      <br /> 여러 속성을 추가 가능하고, 불변으로 변경
      <br /> 설정하려는 속성만 지정하면, 해당 속성만 바뀌고 다른 속성은 그대로 유지 Object.assign(//,oldState, newState);
      <br /> store.subscribe(()=>/ store가 변결될때마다 호출 함수 /)

      <br /><br /><div>&diams; <strong>리액트 훅을 이용한 리렌더링 최적화</strong></div>
      <br /> text만 바귀어도 리렌더링 됨
      <Component />
      <br /> 수동렌더링최적화, useStore((state)=> state.count);; count만 구독하여 count가 바뀔때만 리렌더링 됨
      <Component2 />
      <br /> count값이 변경되지 않은 경우에도 리렌더링, 잘못된 사용법
      {/* <Component3 /> */}

      <br /><br /><div>&diams; <strong>읽기 상태와 갱신 상태 사용하기</strong></div>
      <Counter1 />
      <br />create 첫번째 인수는 setState로 set으로 줄여서 사용
      <Counter2 />
      <br />유효한 패턴, 1은 늘고 2가 줄어서 합계가 동일할때도 리렌더링이 일어남
      <Total />
      <br /> selectTotal 함수로 외부로 빼서 합계가 바뀔때만 리렌더링 됨, 최적화
      <Total2 />
      <br /> 합계를 구하는 다른 접근 방식 (단순한 방법) -> Jotai가 이런부분은 더 편함
      <App />

      <br /><br /><div>&diams; <strong>구조화된 데이터 처리하기 (todo list)</strong></div>
      <br /> 단순히 숫자를 처리하는 예제는 쉬움, 객체, 배열 조합 처리 경우, memo로 리렌더링 피함
      <App2 />

      <br /><br /><div>&diams; <strong>이 접근 방식과 라이브러리의 장단점</strong></div>
      <br />읽기상태 - 리렌더링을 최적화하기 위해 선택자 함수 사용
      <br />쓰기상태 - 불편 상태 모델을 기반 (리액트 최적화)
      <Component4 />
      <br /> ----------------------------------------------------------------------
      <br /> 리액트 불변성과 주스탠드의 규칙과 일치함
      <br /> 선택자를 이용한 수동 렌더링 최적화
      <br /> 리액트와 동일한 모델을 사용해 라이브러리의 단순성과 번들크기 작음
      <br /> 참조 동등성 및 메모이제이션
      <br /> => 모듈 상태를 사용하는 작은 라이브러리
      <br /> store 생성자에 일부 기능을 제공할 수 있는 미들웨어와 리액트 생명 주기에서 store를 생성하는 비모듈 상태 사용 기능도 있음
      <br /><br /><br /><br /><br />
    </div>
  )
}