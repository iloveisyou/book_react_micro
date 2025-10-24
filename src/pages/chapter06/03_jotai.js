import React, { useState, createContext, useContext, useEffect, memo, useCallback } from 'react';
import { atom, useAtom, Provider } from 'jotai';
// import { createStore } from './reduxs';
import { nanoid } from 'nanoid';

///////////////////////////////////////////////////////////////////////// Jotai 이해하기

const Counter1 = () => {
  const [ count, setCount] = useState(0);
  const inc = () => setCount( c => c + 1);
  return <div> count: {count} <button type="button" onClick={inc}>+1</button></div>
}
const Counter2 = () => {
  const [ count, setCount] = useState(0);
  const inc = () => setCount( c => c + 1);
  return <div> count: {count} <button type="button" onClick={inc}>+1</button></div>
}
const App = () => <><Counter1 /> <Counter2 /></>

// ----------------------------------------------------------------------

const CountCountext = createContext();
const CountProvider = ({children}) => <CountCountext.Provider value={useState(0)}> {children} </CountCountext.Provider>

const Counter21 = () => {
  const [ count, setCount ] = useContext(CountCountext);
  const inc = () => setCount(c => c + 1);
  return <div> count: {count} <button type="button" onClick={inc}>+1</button></div>
}
const Counter22 = () => {
  const [ count, setCount ] = useContext(CountCountext);
  const inc = () => setCount(c => c + 1);
  return <div> count: {count} <button type="button" onClick={inc}>+1</button></div>
}
const App2 = () => <div><CountProvider><Counter21 /> <Counter22 /></CountProvider></div>

// ----------------------------------------------------------------------

const countAtom = atom(0);
const Counter31 = () => {
  const [ count, setCount ] = useAtom(countAtom);
  const inc = () => setCount(c => c + 1);
  return <div> count: {count} <button type="button" onClick={inc}>+1</button></div>
}
const Counter32 = () => {
  const [ count, setCount ] = useAtom(countAtom);
  const inc = () => setCount(c => c + 1);
  return <div> count: {count} <button type="button" onClick={inc}>+1</button></div>
}
const App3 = () => <> <Counter31 /> <Counter32 /> </>

///////////////////////////////////////////////////////////////////////// 렌더링 최적화

export const createStore = (initialState) => {
  let state = initialState;
  const callbacks = new Set();
  const getState = () => state;
  const setState = (nextState) => {
    state = (typeof nextState === 'function') ? nextState(state) : nextState;
    callbacks.forEach((callback) => callback());
  };
  const subscribe = (callback) => {
    callbacks.add(callback);
    return () => { callbacks.delete(callback); }
  };
  return { getState, setState, subscribe };
}
export const useStoreSelector = (store, selector) => {
  const [state, setState] = useState(()=>selector(store.getState()));
  useEffect(()=>{
    const unsubscribe = store.subscribe(()=> { setState(selector(store.getState())); });
    setState(selector(store.getState()));
    return unsubscribe;
  }, [store, selector]);
  return state;
}
const personStore = createStore({ firstName: 'React', lastName: 'Hooks', age: 3, });
const selectFirstName = state => state.firstName;
const selectLastName = state => state.lastName;
const PersonComponent = () => {
  const firstName = useStoreSelector(personStore, selectFirstName);
  const lastName = useStoreSelector(personStore, selectLastName);
  return <div> {firstName} {lastName} </div>
}

const firstNameAtom = atom('React2');
const lastNameAtom = atom('Hook2');
const ageAtom = atom(3);
const PersonComponent2 = () => {
  const [firstName] = useAtom(firstNameAtom);
  const [lastName] = useAtom(lastNameAtom);
  return <div> {firstName} {lastName} </div>
}

const personAtom = atom((get)=>({ // 의존성 추적
  firstName: get(firstNameAtom),
  lastName: get(lastNameAtom),
  age: get(ageAtom),
}));
const PersonComponent3 = () => {
  const person = useAtom(personAtom)[0];
  console.log(personAtom);
  console.log(person);
  return <div> {person.firstName} / {person.lastName} </div>
}

const fullNameAtom = atom((get) => ({
  firstName: get(firstNameAtom),
  lastName: get(lastNameAtom),
}));
const PersonComponent4 = () => {
  const person = useAtom(fullNameAtom)[0];
  console.log(personAtom);
  console.log(person);
  return <div> {person.firstName} / {person.lastName} </div>
}

const identity = (x) => x;
const PersionComponent5 = () => {
  const person = useStoreSelector(personStore, identity);
  return <div> {person.firstName} / {person.lastName} </div>
}
const selectFullName = (state) => ({ firstName: state.firstName, lastName: state.lastName, });
const PersonComponent6 = () => {
  const person = useStoreSelector(personStore, selectFullName);
  return <div> {person.firstName} / {person.lastName} </div>
}

const count1Atom = atom(0);
const count2Atom = atom(0);
const Counter = ({countAtom}) => {
  const [count, setCount] = useAtom(countAtom);
  const inc = () => setCount(c => c + 1);
  return <> count: {count} <button type="button" onClick={inc}>+1</button></>
}
const totalAtom = atom( get => get(count1Atom) + get(count2Atom));
const Total = () => {
  const [total] = useAtom(totalAtom);
  return <> total: {total}</> 
}
const App4 = () => <div> (<Counter countAtom={count1Atom} />) +  (<Counter countAtom={count2Atom} />) = <Total /> </div>

/////////////////////////////////////////////////////////////////////////  Jotai가 아톰 값을 저장하는 방식 이해하기

const countAtom2 = atom(0);
const Counter4 = ({countAtom}) => {
  const [count, setCount] = useAtom(countAtom);
  const inc = () => setCount(c => c + 1);
  return <div> count: {count} <button type="button" onClick={inc}>+1</button> </div>
}
const Counter5 = ({countAtom}) => {
  const [count, setCount] = useAtom(countAtom);
  const inc = () => setCount(c => c + 1);
  return <div> count: {count} <button type="button" onClick={inc}>+1</button> </div>
}
const App5 = () => (
  <>
    <Provider>
      <br /> first Provider
      <Counter4 countAtom={countAtom2} />
      <Counter4 countAtom={countAtom2} />
    </Provider>
    <Provider>
      <br /> Second Provider
      <Counter4 countAtom={countAtom2} />
      <Counter4 countAtom={countAtom2} />
    </Provider>
  </>
);

const doubledCountAtom = atom( (get) => get(countAtom2) + 2 );
const doubledCountAtom11 = atom( (get) => get(doubledCountAtom) * 2 );
const Double = () => {
  const [double] = useAtom(doubledCountAtom);
  console.log('double', double)
  return <> double: {double} </>;
}
const App6 = () => {
  const [double] = useAtom(doubledCountAtom11);
  // useEffect(()=>{
  //   console.log('doubledCountAtom', double);
  // },[countAtom2]);
  return <>
    <Provider>
      <br /> third Provider : 두배가 되는 파생 아톰
      {/* <Counter4 countAtom={countAtom2} />
      <Counter5 countAtom={countAtom2} /> */}
      <div>double*2: {double}</div>
      <Double />
    </Provider>
  </>
};

// ---------------------------------------------------------------------- Todo 예제 - 전통적인 접근방식

const todosAtom = atom([]);
const TodoItem = ({todo, removeTodo, toggleTodo,}) => {
  return (<div>
    <input type="checkbox" checked={todo.done} onChange={()=> toggleTodo(todo.id)} />
    <span style={{textDecoration: todo.done ? 'line-through' : 'none'}}>{todo.title}</span>
    <button type="button" onClick={()=> removeTodo(todo.id)}>Delete</button>
  </div>);
}
const MemoedTodoItem = memo(TodoItem);
const TodoList = () => {
  const [todos, setTodos] = useAtom(todosAtom);
  const removeTodo = useCallback((id) => { setTodos(prev => prev.filter(item => item.id !== id))}, [setTodos]);
  const toggleTodo = useCallback((id) => { setTodos( prev => prev.map(item => item.id === id ? {...item, done: !item.done} : item))}, [setTodos]);
  console.log('TodoItem2',todos);
  return <div> {todos.map(todo => <MemoedTodoItem key={todo.id} todo={todo} removeTodo={removeTodo} toggleTodo={toggleTodo} />)} </div>
}
const NewTodo = () => {
  const [todos, setTodos] = useAtom(todosAtom);
  const [text, setText] = useState('');
  const onClick = () => {
    setTodos(prev => [...prev, {id: nanoid(), title: text, done: false}]);
    setText('');
  };
  return (<div>
    <input value={text} onChange={(e)=>setText(e.currentTarget.value)} /> 
    <button onClick={onClick} disabled={!text}>Add</button>
  </div>) 
}
const App7 = () => <div><TodoList /> <NewTodo /></div>

// ---------------------------------------------------------------------- Todo 예제 - 새로운패턴 Atoms-in-Atom

const todoAtomsAtom = atom([]);
const TodoItem2 = ({todoAtom, remove}) => {
  // console.log(JSON.stringify(todoAtom));
  const [todos, setTodos] = useAtom(todoAtom);
  return (<div>
    <input type="checkbox" checked={todos.done} onChange={() => setTodos(prev => ({...prev, done: !prev.done}))} />
    <span style={{textDecoration: todos.done ? 'line-through' : 'none'}}>{todos.title}</span>
    <button type="button" onClick={()=>remove(todoAtom)}>Delete</button>
  </div>)
}
const MemoedTodoItem2 = memo(TodoItem2);
const TodoList2 = () => {
  const [todoAtoms, setTodoAtoms] = useAtom(todoAtomsAtom);  // useAtom으로 받음 (useState 아님)
  const remove = useCallback((todoAtom => setTodoAtoms(prev => prev.filter(item => item !== todoAtom))), [setTodoAtoms]);
  // console.log('todoAtom', todoAtoms);
  return (<div>
    {todoAtoms.map(todoAtom => (<MemoedTodoItem2 key={`${todoAtom}`} todoAtom={todoAtom} remove={remove} />))}
  </div>);
}
const NewTodo2 = () => {
  const [, setTodoAtoms] = useAtom(todoAtomsAtom);
  const [text, setText] = useState('');
  const onClick = () => {
    console.log(text);
    setTodoAtoms(prev => [...prev, atom({title: text, done: false})]); // atom으로 감싸주는게 포인트
    setText('');
  }
  return (<div>
    <input type="text" value={text} onChange={e => {setText(e.target.value)}} />
    <button onClick={onClick} disabled={!text}>Add</button>
  </div>)
}
const App8 = () => <div><TodoList2 /> <NewTodo2 /></div>

///////////////////////////////////////////////////////////////////////// Jotai의 다양한 기능

const countAtom3 = atom(0);
const doubledCountAtom2 = atom(get => get(countAtom3) * 2); // read함수
const doubledCountAtom3 = atom(get => get(countAtom3) * 2, (get, set, arg) => set(countAtom3, arg / 2)); // write함수 
const anotherCountAtom = atom(
  get => get(countAtom3), 
  (get, set, arg) => { 
    const nextCount = typeof arg === 'function' ? arg(get(countAtom3)) : arg; 
    set(countAtom3, nextCount);
    console.log('=========set count', nextCount);
  }
);
const Ca1 = () => { const [ca, setCa] = useAtom(countAtom3); const onClick = () => setCa(c=>c+1); return <>ca1 : {ca} <button type="button" onClick={onClick}>click</button></> }
const Ca2 = () => { const [ca] = useAtom(doubledCountAtom2); return <>ca2 : {ca}</> }
const Ca3 = () => { const [ca] = useAtom(doubledCountAtom3); return <>ca3 : {ca}</> }
const App9 = () => { 
  const [test, setText] = useAtom(anotherCountAtom);
  console.log(test, 1, 3)
  return <div> app9: <Ca1 /> |  <Ca2 /> | <Ca3 /> </div>
}

// ---------------------------------------------------------------------- 액션 아톰 사용하기

const countAtom4 = atom(0);
const incrementCountAtom = atom(null, (get,set,arg) => set(set(countAtom4, ( c => c + 1))));
const IncrementButton = () => {
  const [count, incrementCount] = useAtom(incrementCountAtom);
  return <div>{count} <button onClick={incrementCount}>Click</button> </div>
}
const App10 = () => <div>countAtom4</div>

// ---------------------------------------------------------------------- 아톰의 onMount 옵션 이해하기

const countAtom5 = atom(0);
countAtom5.onMount = (setCount) => {
  console.log('count atom 사용을 시작합니다.');
  const onUnmount = () => {
    console.log('count atom 사용이 끝났습니다.');
  }
  return onUnmount;
}
const App11 = () => <div>countAtom5</div>

// ----------------------------------------------------------------------  derived atoms (파생원자) 예제 - 아닌듯

const textAtom = atom('hello');
const uppercaseAtom = atom(get => get(textAtom).toUpperCase());
const Input = () => {
  const [text, setText] = useAtom(textAtom);
  const handleChange = e => setText(e.target.value);
  return <input value={text} onChange={handleChange} />
}
const Uppercase = () => {
  const [uppercase] = useAtom(uppercaseAtom);
  return <div>Uppercase: {uppercase}</div>
}
const App12 = () => <div> <Input /> <Uppercase /> </div>

// ----------------------------------------------------------------------  derived atoms (파생원자) 예제2 - 아닌듯

const countAtom6 = atom(0);
const countryAtom = atom('Korea');
const citiesAtom = atom(['Seoul', 'Gyeonggi', 'Busan']);
const animeAtom = atom([ {title: 'Ghost in the Shell', year: 1995, watched: true}, {title: 'Serial Experiments Lain', year: 1998, watched: false} ]);
const progressAtom = atom(get => {
  const anime = get(animeAtom);
  return anime.filter(item => item.watched).length / anime.length;
});
const AnimeApp = () => {
  const [anime, setAnime] = useAtom(animeAtom);
  return <div>
    <ul>
      {anime.map(item => <li key={item.title}>{item.title}</li>)}
    </ul>
    <button onClick={() => setAnime(anime => [...anime, {title: 'Cowboy Bebop', year: 1998, watched: false}])}>Add Cowboy Bebop</button>
  </div>
}

// ----------------------------------------------------------------------  Example. Text Length example (https://tutorial.jotai.org/examples)

const textAtom2 = atom('hello');
const textLenAtom = atom(get => get(textAtom2).length);
const uppercaseAtom2 = atom(get => get(textAtom2).toUpperCase());
const Input2 = () => { const [text, setText] = useAtom(textAtom2); return <input value={text} onChange={e=>setText(e.target.value)} /> }
const CharCount = () => { const [len] = useAtom(textLenAtom); return <div> Length: {len}</div> }
const Uppercase2 = () => { const [uppercase] = useAtom(uppercaseAtom2); return <div>Uppercase: {uppercase}</div> }
const TextLengthExample = () => <div> <Input2 /> <CharCount /> <Uppercase2 /> </div>

// ----------------------------------------------------------------------  Example. Todos example (https://tutorial.jotai.org/examples)

const filterAtom = atom('all');
const todosAtom2 = atom([]);
const filteredAtom = atom(get => {
  const filter = get(filterAtom);
  const todos = get(todosAtom2);
  if (filter === 'all') { return todos }
  else if ( filter === 'completed' ) { return todos.filter(atom => get(atom).completed); }
  else { return todos.filter(atom => !get(atom).completed); }
});
const TodoItem3 = ({atom, remove}) => {
  const [item, setItem] = useAtom(atom);
  const toggleCompleted = () => setItem(props => ({...props, completed: !props.completed}));
  return <div>
    <input type="checkbox" checked={item.completed} onChange={toggleCompleted} />
    <span style={{textDecoration : item.completed ? 'line-through':'none'}}>{item.title}</span>
    <button type="button" onClick={()=>remove(atom)}>X</button>
  </div>
}
const Filter = () => {
  const [filter, set] = useAtom(filterAtom);
  return <div>
    <label><input type="radio" name="inputRadio" value="all" /> all </label>
    <label><input type="radio" name="inputRadio" value="Completed" /> Completed </label>
    <label><input type="radio" name="inputRadio" value="Incompleted" /> Incompleted </label>
  </div>
}
const Filtered = (props) => {
  const [todos] = useAtom(filteredAtom);
  // const trannsitions = useTrans
}


export const ComponentJotai = () => {
  return <div>
    <h3>08 사용 사례 시나리오 2: Jotai (조타이) </h3>
    <br /> 전역 상태를 위한 작은 라이브러리
    <br /> useState, useReducer 와 함께 상태으 ㅣ작은 조각인 아톰을 모델로 삼음
    <br /> 주스탠드와 달리 컴포넌트 상태를 사용
    <br /> 컨택스트와 구독을 이용한 컴포넌트 상태 공유 - 컨텍스트 및  구독 패턴을 기반

    <br /><br /><div>&diams; <strong>Jotai 이해하기</strong></div>
    <br /> 각 컴포넌트에는 고유한 지역상태로 서로 격리되어 있음
    <App />
    <br /> 서로 공유, context(Provier) 사용
    <App2 />

    <br /><br />- jotai가 context보다 좋은 점1. 구문 단순성
    <br /> 구독이 필요 없고 소스 심플, 사용 간편
    <App3 />
    <br /> const TextContext = createContext(); 
    <br /> const TextProvider = (/children/) => |TextContext.Provider value=/useState('hello')/| /children/ |/TextContext.Provider|
    <br /> const App = () => |TextProvider| 내용 |/TextProvider|
    <br /> 사용시 -> const [text, setText] = useContext(TextContext);
    <br /> &darr;&darr;&darr;&darr;&darr;&darr; Jotai로 간편하게 처리
    <br /> const textAtom = atom('');
    <br /> 사용시 -> const [text, setText] = useAtom(textAtom);

    <br /><br />- jotai가 context보다 좋은 점2. 동적 아톰 생성
    <br /> jotai 스토어는 기본적으로 아톰구성객체(atom함수)와 아톰값(useAtom훅이반환하는값)으로 구성된 WeakMap객체
    <br />  useAtom 훅이 store에 있는 특정 아톰을 구독하는 방식

    <br /><br /><div>&diams; <strong>렌더링 최적화</strong></div>
    <PersonComponent />
    <br /> store에서 2개 속성만 선택했기 때문에 age가 변경되어도 리렌더링 안됨.
    <br /> store와 선택자 접근 방식, 하향식 접근법 - 모든 것을 저장한 store를 생성 필용 따라 store에서 상태를 선택
    <br /> &darr;&darr;&darr;&darr;&darr;&darr; Jotai롤 처리
    <PersonComponent2 />
    <br /> &darr;&darr;&darr;&darr;&darr;&darr; Jotai롤 처리 (파생아톰, read 함수는 get 인수를 받음), 의존성 추적 자동수행, 하나만 바뀌어도 갱신
    <PersonComponent3 />
    <br /> &darr;&darr;&darr;&darr;&darr;&darr; Jotai롤 처리 (리렌더링을 피할려면 별도의 파생아톰을 생성), 상향식 접근법, 작은 아톰들의 결합, 자동최적화는 아니지만 아템모델을 통해 가능
    <PersonComponent4 />
    <br /> &darr;&darr;&darr;&darr;&darr;&darr; 스토어와 선택자 접근방식 - 리렌더링 발생
    <PersionComponent5 />
    <br /> &darr;&darr;&darr;&darr;&darr;&darr; 스토어와 선택자 접근방식 - 이방법도 리렌더링 - age가 바뀌면 selectFullName 함수가 재평가되고 동일한 속성 값으로 가진 새로운 객체로 반환, 
    <br /> 선택자 접근방식의 대표적 문제 -> 해결책으론 동등함수제 생성, 메이제이션 사용
    <br /> 아템모델의 장점은 아톰 구성이 컴포넌트 표시와 쉽게 연관 지음 -> 리렌더링 제어 간단 -> 위 해결책 필요없음
    <PersonComponent6 />
    <br /> &darr;&darr;&darr;&darr;&darr;&darr; 아톰모델의 장점
    <App4 />

    <br /><br /><div>&diams; <strong>Jotai가 아톰 값을 저장하는 방식 이해하기</strong></div>
    <br /> &darr;&darr;&darr;&darr;&darr;&darr; Jotai의 Provider 를 활용하여 두값 공유
    <App5 />
    <App6 />
    
    <br /><br /><div>&diams; <strong>배열 구조 추가하기</strong></div>
    <br /> 배열 구조를  처리하는 방법. 전통적인 접근 방식부터 시작해서 아톰 속 아톰들이라고 부르는 새로운 패턴
    <br /> 할일 목록을 추가, 제거, 변경
    <br /> 우려점1. 단일요소를 변경하기 위해 todos배열 전체 갱신됨 (성능) -> 그래서 memo 사용 -> 이상적으로는 리렌더링되도록 감지하게 두는게 좋음
    <br /> 우려점2. id값은 주로 key로 사용하는데 id를 사용하지 않는게 좋음
    <br /> &darr;&darr;&darr;&darr;&darr;&darr; 전통적인 접근방식
    <App7 />
    <br /> &darr;&darr;&darr;&darr;&darr;&darr; 새로운패턴 Atoms-in-Atom
    <br /> 배열 아톰은 아톰이 요소인 배열을 보관하는 데 사용, 새로운 아톰을 추가해서 생성해서 추가, 아톰 구성은 무자열로 평가(UID반환)
    <br /> nanoid 대신 atom으로 감싸주고 useAtom으로 받으면 편함.
    <br /> 요소를 렌더링하는 컴포넌트는 각 컴포넌트에서 아톰요소 사용 (쉽게 변경 및 리렌더링 피함)
    <App8 />

    <br /><br /><div>&diams; <strong>Jotai의 다양한 기능 사용하기 (복잡한사례 및 고급기능)</strong></div>

    <br /> &darr;&darr;&darr;&darr;&darr;&darr; 아톰의 write 함수 정의하기
    <br /> atom 함수의 1번째 인수 read함수 = get(아톰값 변환) / 2번째 write함수 = set함수(아톰값 설정) / 3번째 write함수 = arg(아톰을 갱신할때 받을 임의의 값) 
    <App9 />

    <br /> &darr;&darr;&darr;&darr;&darr;&darr; 액션 아톰 사용하기 (write함수)
    <br /> 상태를 변경하는코드를 위해 함수, 함수 집함을 만드는 경우 (액션아톰)
    <App10 />
    
    <br /> &darr;&darr;&darr;&darr;&darr;&darr; 아톰의 onMount 옵션 이해하기 (useEffect -> onMount)
    <br /> 아톰이 사용되기 시작할때 특정 로직 실행하고 싶을때
    <App11 />

    <br /> &darr;&darr;&darr;&darr;&darr;&darr;  derived atoms (파생원자) 예제
    <br /> 자신의 값을 반환하기 위해 다른 원자로부터 읽어 올수 있음, 전체 뉴스 목록이라는 상태관리(사용자가 보고 있는 뉴스 인덱스에 대한 뉴스 상태 저장할때 유용)
    <App12 />
    <AnimeApp />

    <br /> &darr;&darr;&darr;&darr;&darr;&darr;  Example. Text Length example (https://tutorial.jotai.org/examples)
    <TextLengthExample />


    <br /> &darr;&darr;&darr;&darr;&darr;&darr; jotai/utils 번들 소개하기
    <br /> Jotai라이브러리는 기본번들에서 2가지 기본함수인 atom, useAtom, Provider 컴포넌트
    <br /> 기본적인 기능을 이해하기에 좋지만 실제 개발에 도움되는 몇가지 유틸리티 기능 필요 (jotai/utils)
    <br /> ㄴ atomWithStorage : 지속적으로 스토리지와 동기화하는 기능을 가진 아톰을 생성하는 함수
    <br /> &darr;&darr;&darr;&darr;&darr;&darr; 라이브러리 사용법 이해하기
    <br /> 2개 라이브러리가 내부적으로 Jotai 라이브러리를 사용한다고 가정 -> 이중 공급자 문제 발생
    <br /> ㄴ Jotai 아톰은 참조로 구분되기 때문에 첫번째 라이브러리 아톰이 두번재 라이브러리 공급자에 연결될수있음 = 예상대로 동작 안함
    <br /> ㄴ> 특정 공급자에 연결하는 방법인 스코프라는 개념제공. 예상대로 작동하게 하려면 Provider컴포넌트와 useAtom훅에 동잉ㄹ한 스코프 변수 전달
    <br /> &darr;&darr;&darr;&darr;&darr;&darr; 고급 기능 소개
    <br /> - 리액트 서스펜스 기능 지원 - 파생아톰의 read 함수가 Promise를 반환하면 useAtom혹이 일지 중단되고 리액트 풀백을 표시(아직실험중,나중에변경될수도)
    <br /> - 라이브러리 통합 - Jotai는 아톰 모델을 사용해 불필요한 리렌더링 문제 해결하기 위한 라이브러리, 다른 라이브러리와 함께 사용하면 ㅅ나용 사례 확장,
    <br /> - 아톰모델은 다른 라이브러리와 유연하게 통합가능(특히 외부 데이터 소스에는 onMout 옵션이 필요)
    <br /> ----------------------------------------------------------------------
    <br /> 아톰 모델과 컨텍스트를 기반
    <br /> 아톰 모델의 유연성
    <br /> 컨텍스트와 구독의 조합은 리액트 지향적으로 전역 상태를 가질 수 있는 유일한 방법
    <br /> 불필요한 리렌더링 없이 컨텍스트가 필요한 경우 이 접근 방식 선택
    



    <br /><br /><br /><br /><br /><br /><br /><br />
  </div>
} 