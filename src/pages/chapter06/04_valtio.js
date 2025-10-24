import React, { memo, useState } from 'react';
import { create } from 'zustand';
import { proxy, snapshot, useSnapshot } from 'valtio';
import { nanoid } from 'nanoid';
// import { useStore } from 'react-redux';

const store = create(() => ({count: 0, text: 'hello'}));
console.log(store.getState());
store.setState(prev => ({count: prev.count + 1,}))
console.log(store.getState());
// moduleState = Object.assign({}, moduleState, { count: moduleState.counmt + 1 }) // 1. 객체를 불변으로 갱신
// ++moduleState.count; // 2. 불변 갱식 규칙을 따를 필요가 없을 경우
const proxyObject = new Proxy({count: 0, text: 'hello'},{ // 프락시를 사용하면 2번 구현가능
  set: (target, prop, value) => { 
    console.log('start setting', prop);
    target[prop] = value;
    console.log('end setting', prop);
  }
});

// ---------------------------------------------------------------------- 프락시를 활용한 변경 감지 및 불변 상태 생성하기

const state = proxy({ count: 0 }); // count 속성을 가진 객체 생성
const snap1 = snapshot(state); // proxy 함수에서 변환하는 state객체는 변경을 감지하는 프락시객체 -> 불변객체 생성 가능 (snapshot)
++state.count;
console.log('state1', state);
const snap2 = snapshot(state);
console.log('state2', state);
console.log('snap1', snap1);
console.log('snap2', snap2);

const state2 = proxy({obj1: {c:0}, obj2: {c:0}});
const snap21 = snapshot(state2);
++state2.obj1.c;
const snap22 = snapshot(state2);
console.log('snap21', snap21);
console.log('snap22', snap22);

// ---------------------------------------------------------------------- 프락시를 활용한 리렌더링 최적화 

const state3 = proxy({ count1: 0, count2: 0 });
const Counter1 = () => {
  const snap = useSnapshot(state3);
  const inc = () => ++state3.count1;
  return <div> {snap.count1} <button type="button" onClick={inc}>+1</button> </div>
}
const Counter2 = () => {
  const snap = useSnapshot(state3);
  const inc = () => ++state3.count2;
  return <div> {snap.count2} <button type="button" onClick={inc}>+1</button> </div>
}
const App = () => <div> <Counter1 /> <Counter2 /> </div>
const contrivedState = proxy({ num: 123, str: 'hello', arr: [1, 2, 3], nestedObject: { foo: 'bar' }, objectArray: [{a: 1}, {b: 2}], });

// ---------------------------------------------------------------------- 작은 어플리케이션 만들어 보기 - 체크시 전체 리스트가 리렌더링 된다는 문제

const state4 = proxy({todos: []});
const createTodo = (title) => {
  state4.todos.push({ id: nanoid(), title, done: false, });
  console.log(title);
  console.log(state4.todos);
}
const removeTodo = id => {
  const index = state4.todos.findIndex(item => item.id === id);
  state4.todos.splice(index, 1);
}
const toggleTodo = (id) => {
  const index = state4.todos.findIndex(item => item.id === id)
  state4.todos[index].done = ! state4.todos[index].done;
}
const TodoItem = ({id, title, done}) => {
  return <div>
    <input type="checkbox" checked={done} onChange={() => toggleTodo(id) } />
    <span style={{textDecoration: done ? 'line-through' : 'none' }}>{title}</span>
    <button type="button" onClick={() => removeTodo(id) }>Delete</button>
  </div>
}
const MemoedTodoItem = memo(TodoItem);
const TodoList = () => {
  const {todos} = useSnapshot(state4);
  return <div>{todos.map(todo => <MemoedTodoItem key={todo.id} id={todo.id} title={todo.title} done={todo.done} />)}</div>
}
const NewTodo = () => {
  const [text, setText] = useState('');
  const onClick = () => { createTodo(text); setText(''); }
  return <div> <input type="text" value={text} onChange={(e)=>setText(e.target.value)} /> <button type="button" onClick={onClick} disabled={!text}>Add</button> </div>
}
const App2 = () => <div> <NewTodo /> <TodoList /> </div>

// ---------------------------------------------------------------------- 작은 어플리케이션 만들어 보기 - 체크시 전체 리스트가 리렌더링 된다는 문제

const state5 = proxy({todos: []});
const createTodo2 = (title) => {
  state5.todos.push({ id: nanoid(), title, done: false, });
  console.log(title);
  console.log(state5);
}
const removeTodo2 = id => {
  const index = state5.todos.findIndex(item => item.id === id);
  state5.todos.splice(index, 1);
}
const toggleTodo2 = id => {
  const index = state5.todos.findIndex(item => item.id === id)
  state5.todos[index].done = ! state5.todos[index].done;
}
const TodoItem2 = ({id}) => {
  const todoState = state5.todos.find(todo => todo.id === id);
  if(!todoState) { throw new Error('invalid todo id'); }
  const { title, done } = useSnapshot(todoState);
  return <div>
    <input type="checkbox" checked={done} onChange={()=>toggleTodo2(id)} />
    <span style={{ textDecoration: done ? 'line-through' : 'none' }}>{title}</span>
    <button type="button" onClick={()=>removeTodo2(id)}>Delete</button>
  </div>
}
const MemoedTodoItem2 = memo(TodoItem2);
const TodoList2 = () => {
  const {todos} = useSnapshot(state5);
  const todoIds = todos.map(todo => todo.id);
  return <div>{todoIds.map(todoId => <MemoedTodoItem2 key={todoId} id={todoId} />)} </div>
}
const NewTodo2 = () => {
  const [text, setText] = useState('');
  const onClick = () => { createTodo2(text); setText(''); }
  return <div> <input type="text" value={text} onChange={(e)=>setText(e.target.value)} /> <button type="button" onClick={onClick} disabled={!text}>Add</button> </div>
}
const App3 = () => <div> <NewTodo2 /> <TodoList2 /> </div>

// ---------------------------------------------------------------------- 변경가능한 갱신으로 코드 줄이기

const state6 = proxy({count: 3, text: 'hello'});
const Component4Valtio = () => {
  const { count } = useSnapshot(state6);
  return <>{count}</>
}
const useStore = create(() => ({ count: 2, text: 'hello' }));
const ComponentZustand = () => {
  const count = useStore(state => state.count);
  return <>{count}</>
}
const App4 = () => <div>Valtio : <Component4Valtio /> / Zustand: <ComponentZustand /> </div>

const ComponentValtio2 = ({showText}) => {
  const snap = useSnapshot(state6);
  return <>{snap.count} {showText ? snap.text : ''} </>
}
const ComponentZustand2 = ({showText}) => {
  const count = useStore(state => state.count);
  const text = useStore(state => showText ? state.text : '');
  return <>{count} {text}</>
}
const App5 = () => <div>Valtio : <ComponentValtio2 /> / Zustand: <ComponentZustand2 /> </div>

export const ComponentValtio = () => {
  return (
    <div>
      <h3>09 사용 사레 시나리오 3: Valtio</h3>
      <br /> Zustand, Jotai와 다르게 변경 가능한 갱신 모델 (mutating update model) 을 기반 0 전역 상태 관리 라이브러리
      <br /> Zustand와 같이 모듈 사태용으로 사용
      <br /> 리액트와 통합을 위해 Valtio는 프락시 사용해 변경 불가능한 스냅숏을 가져옴
      <br /> API는 자바스크립트로만 이뤄져 있음, 모든 작업이 내부에서 처리하기
      <br /> Valtio는 프락시를 활용해 자동으로 리렌더링 최적화 (리렌더링 제어하기 위해 선택자 필요없음)
      <br /> 자동 렌더링 최적화 - 상태 사용추적 (state usage tracking) 이라는 기법을 기반 - 자동감지,소스줄음

      <br /><br /><div>&diams; <strong>또 다른 모듈 상태 라이브러리인 Valtio 살펴보기</strong></div>
      <br /> 객체 불변으로 갱신 : Object.assign 사용 / 불변갱신규칙 필요없으면  ++moduleState.count
      <br /> Proxy 를 활용하면 두번째로도 구현 가능함 - 개념적으로 프락시는 모든 변경을 감지 (zustand의 setState와 유사)
      <br /> Valtio는 프락시를 활용해 상태변경을 감지하는 라이브러리

      <br /><br /><div>&diams; <strong>프락시를 활용한 변경 감지 및 불변 상태 생성하기</strong></div>
      <br /> 프락시를 사용해 변경 가능한 객체에서 변경 불가능한 객체를 생성 - 스탭숏 (snapshot) 불변객체
      <br /> proxy와 snapshot 함수는 중첩된 객체에 대해서도 작동하며 스냅숏 생성을 최적화 - 바뀌지 않은 객체에 대해서 동일한값을 참조 함
      <br /> Valtio의 최적화는 이전 스냅숏에 대한 캐싱을 기반. 즉 캐싱공간이 하나
      <br /> Zustand는 불변상태를 적절하게 생성은 개발자 몫 != Valtio는 내부에서 최적화 실행(개발자가 새로운 불변상태 생성하는 책임에서 자유로움)

      <br /><br /><div>&diams; <strong>프락시를 활용한 리렌더링 최적화</strong></div>
      <br /> snap 객체는 Object.freeze로 동결되며 기술적으로 변경할 수 없음, useSnapshot훅에 의한 추적정보 감지하여 리렌더링
      <br /> Valtio 중첩된 객체와 배열 지원
      <App />
      <br /> 일반적인 객체와 배열을 포함하는 어떤 객체도 완전하게 지원 (중첩도)

      <br /><br /><div>&diams; <strong>작은 어플리케이션 만들어 보기</strong></div>
      <br /> 아래는 체크시 전체 리스트가 리렌더링 된다는 문제가 있음
      <App2 />
      <br /> 아래는 리렌더링 최적화 패턴
      <br /> item 부모 list에서 done값을 가지고 있지 않게 패턴을 짜면 전체 리렌더링은 일어나지 않음
      <App3 />

      <br /><br /><div>&diams; <strong>이 접근 방식의 장단점</strong></div>
      <br /> 상태 업데이트 모델 - 불변갱신 (리액트), 변경가능한갱신 (자바스크립트)
      <br /> 변경가능한 갱신을 사용할려면 리액트소스랑 잘 분리해야 함
      <br /> 장점은 배열 삭제시, arry.splice(index, i) 로 삭제 끝, 불변갱신은 [...array.slice(0, index), ...array.slice(index + 1)]
      <br /> 장점은 배열 수정시, state.a.b.c.text='hello'; 로 끝, 불변갱신은 /...state, a: /...state.a, b: /...state.a.b, c: /...state.a.b.c, text: 'hello'///
      <br /> Valtio는 변경가능한갱신으로 코드를 줄이는데 도움
      <App4 />
      <br /> 조건이 많아질수록 훅이 더 많이 필요. 반면 프락시 기반 렌더링 최적화의 단점은 예측 가능성이 떨어짐
      <App5 />

      <br /> ----------------------------------------------------------------------
      <br /> 프락시를 광범위하게 사용하는 라이브러리
      <br /> 일반 자바스크립트 객체사용하는 것과 같이 상태를 변경
      <br /> 프락시 기반의 렌더링 최적화 + 코드 줄임
    
      <br /><br /><br /><br /><br /><br /><br /><br />
    </div>
  )
}