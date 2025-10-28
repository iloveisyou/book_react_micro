// import { useSelector } from 'react-redux';

let globalVariable = {
  a: 1,
  b: {
    c: 2,
    d: 3,
  },
  e: [4, 4, 6],
};
console.log('log1_1',globalVariable.b.d);
globalVariable.b.d = 9;
console.log('log1_2',globalVariable.b.d);

// ----------------------------------------------------------------------

const createContainer = () => {
  let state = { a: 1, b: 2 };
  const getState = () => state;
  const setState = (next) => {  state = typeof next === 'function' ? next(state) : next };
  return { getState, setState }
}

const globalContainer = createContainer();
console.log('log2-1', globalContainer.getState());
globalContainer.setState({c: 3, d: 4});
console.log('log2-1', globalContainer.getState());

// ----------------------------------------------------------------------

let state = {
  a: 1,
  b: {c:2, d:3},
  e: {f:4, g:5},
}
const ComponentA = () => <div>valueC: {state.b.c}</div>
const ComponentB = () => <div>valueG: {state.e.g}</div>

++state.a;

// ----------------------------------------------------------------------

const useSelector = (state) => state; // 선택자 함수를 받아 state의 일부를 반환ㄴ하는 useSelector 훅이 있다 가정 
const Component = () => {
  const value = useSelector((state) => state.b.c);
  return <p>useSelector1: {value}</p>
}
const Component2 = () => {
  const value = useSelector((state) => state.b.c * 2);
  return <p>useSelector2: {value}</p>
}

// ----------------------------------------------------------------------

const useTrackedState = () => state; // 상태 사용 추적 기능이 있는 가상의 훅
const Component3 = () => {
  const trackedState = useTrackedState();
  return <p>useTrackedState: {trackedState.b.c}</p>
}
const Component4 = () => {
  const trackedState = useTrackedState();
  return <>
    <p>useTrackedState1: {trackedState.b.c}</p>
    <p>useTrackedState2: {trackedState.e.g}</p>
  </>
}

const Component5 = () => {
  const isSmall = useSelector((state)=> state.a < 10);
  return <p>useSelector: {isSmall ? 'small': 'big'}</p>
}
const Component6 = () => {
  const isSmall = useTrackedState().a < 10;
  return <p>useTrackedState: {isSmall ? 'small' : 'big'}</p>
}

// ----------------------------------------------------------------------

const useAtom = (state) => state; // 아톰만 구독하는 훅이 있다 가정,
const atom = (state) => state;
const globalState = {
  a: atom(1),
  b: atom(2),
  e: atom(3),
} 
console.log('atom1', globalState);
const Component7 = () => {
  const value = useAtom(globalState.a);
  return <p>useAtom: {value}</p>
}


export const ComponentGlobalVariable = () => {
  return (
    <>
      <div>
        <h3>전역 상태 관리 문제 해결하기</h3>
        <br /><br />===== 첫번째문제, 전역상태를 읽는 방법 - 여러값을 가질때 관련없는 화면에도 리렌더링 일어남
        <br /><br />===== 두번째문제, 전역상태에 값을 넣거나 갱신하는 방법
        <br />log1, 전역변수에서 하나의 포로퍼티를 개발자가 직접 값을 변경1 - 리렌더링 안일어날수 있음
        <br />log2, 전역변수에서 하나의 포로퍼티를 개발자가 직접 값을 변경2 - 클로저에서 변수를 읽고 쓰는 함수 만들어서 사용
        <br /><br /> 여기선 전역 상태 관리 초점이며, 범용 상태 관리는 Redux의 단반향 데이터 흐름을 통한 접근 방식과 XState 같은 상태 머신 기반 접근 방식이 널리 사용
        <br />Redux: 전역 상태 관리 Javascript 라이브러리 - 리렌더링피하는 기능 없음 = 범용적인 상태관리를 위한 훈률한 해결책
        <br />React Redux: 전역 상태 관리 React 라이브러리 - 리렌더링피하는 기능 있음 - 단방향에선 안쓰는걸 추천(useContext 훅을 사용, 내리꽂기) = 전역상태 관련 문제 해결

        <br /><br /><h3>데이터 중심 접근 방식과 컴포넌트 중심 접근 방식 사용하기</h3>
        <br /><br />===== 데이터 중심 접근 방식 이해하기 - store
        <br /><br />===== 컴포넌트 중심 접근 방식 이해하기 - props 사용하여 부모에서 관리
        
        <br /><br /><h3>두 접근 방식의 예외</h3>
        <br /> 두방법 혼합해서도 사용, 모듈상태는 주로 데이터중심 접근방식으로 사용, 컴포넌트 상태는 주로 컴포넌트 중심 접근방식 사용

        <br /><br /><h3>리렌더링 최적화</h3>
        <br /><br />===== 일반적인 방법(예제)
        <ComponentA />
        <ComponentB />
        <br />a만 수정했지만 다른 c, g 도 리렌더링이 일어남 (c,g는 바뀔필요 없음, state의 어느부분만 사용할지 지정해서 리렌더링)
        <div>valueA: {state.a}</div>
        <br /><br />===== 불필요한 리렌더링, 지정 렌더링 방법1. 선택자 함수 사용
        <Component />
        <Component2 />
        <br /> useSelector은 상태가 변경될 때마다 선택자 함수의 결과를 비교하는데 사용 -= 수동최적화(컴포넌트의 어느 부분을 사용할지 명시적으로 지정)
        <br /><br />===== 불필요한 리렌더링, 지정 렌더링 방법2. 속성 접근 감지
        <Component3 /> 
        <br /> useTrackedState = 자동 렌더링 최적화 ( useSelector = 수동 렌더링 최적화 )
        <Component4 /> 
        <br /> useSelector(수동) 보다 useTrackedState(자동)가 편리하다, 하지만 단점도 존재, useSelector이 더 좋을때
        <Component5 />
        <Component6 />
        <br /> 위와 같이 둘다 잘 작동하지만, useSelector을 사용하면 값이 바뀔때만 리렌더링 가능함
        <br /><br />===== 불필요한 리렌더링, 지정 렌더링 방법3. 아톰 사용
        <Component7 />
        <br /> 아톰을 사용하는 접근 방식은 수동 최적화와 자동 최적화의 중간 정도 = 파생 값을 정의는 명시적, 의존성 추적은 자동
        <br /><br /> 결론은, 필요에 맞는 라이브러리를 선택해야 함
        <br /> 라이브러리가 전역 상태를 읽고 작성하는 방법, 저장하는 위치, 리렌더링을 최적화 하는 방법등을 고려해 라이브러리 선택
      </div>
    </>
  )
} 