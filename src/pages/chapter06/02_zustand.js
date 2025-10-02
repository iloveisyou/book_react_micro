import { create } from 'zustand'


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
}

export const ComponentZustand = () => {
  return (
    <div>
      <h3>사용사례 시나리오 1: Zustand (주스탠드, 독일어로 상태, v3,v4, / 대괄호)</h3>
      <br /> 상태 객체를 수정할수 없고 항상 새로 만들어야 하는 불변 갱신 모델을 기반
      <br /> 선택자를 사용해 수동으로 렌더링 최적화
      <br /> 간단하면서도 강력한 store 생성자 인터페이스
      <br /> store (getState, setState, subscribe)

      <br /><br /><div>===== 모듈 상태와 불변 상태 이해하기</div>
      <br />불변성을 무시하는 state1.count = 2; store.setState(state1); 이런건 안됨 
      <br /> -> 새로운 객체를 이용해 갱신 store.setState( / count: 2 / )
      <br /> -> 또는 함수를 이용해 갱신 store.setState((prev)=>( / count: pre.count + 1 / ));
      <br /> 여러 속성을 추가 가능하고, 불변으로 변경
      <br /> 설정하려는 속성만 지정하면, 해당 속성만 바뀌고 다른 속성은 그대로 유지 Object.assign(//,oldState, newState);
      <br /> store.subscribe(()=>/ store가 변결될때마다 호출 함수 /)

      <br /><br /><div>===== 리액트 훅을 이용한 리렌더링 최적화</div>
    </div>
  )
}