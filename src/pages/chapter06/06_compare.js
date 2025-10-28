import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './06_compareCounterSlice';

// // features/counter/counterSlice.js
// import { createSlice } from '@reduxjs/toolkit';
// const initialState = { value: 0, }

// export const counterSlice = createSlice({
//   name: 'counter',
//   initialState,
//   reducers: {
//     increment: state => { state.value += 1; },
//     decrement: state => { state.value -= 1; },
//     incrementByAmount: (state, action) => { state.value += action.payload },
//   }
// });
// export const { increment, decrement, incrementByAmount } = counterSlice.actions;
// // export defalut default counterSlice.reducer;


export const ComponentCompare = () => {
  return (
  <div>
    <h3>11 세 가지 전역 상태 라이브러리의 유사점과 차이점</h3>
    <br /> Zustand, Jotai, Valtio 전역상태 라이브러리의 유사점, 차이점
    <br /> - Zustand: 사용법과 스토어 모델 측면에서 Redux(React Redux) 와 유사하지만, Redux와 달리 리듀서 기반 아님
    <br /> - Jotai: API 측면에서 Recoil과 유사하지만 선택자 기반이 아니고 렌더링 최적화를 위한 최소한의 API 제공 목표
    <br /> - Valtio: 변경 가능한 갱신 모델 측면에서 MobX와 조금 유사하지만 렌더링 최적화 구현 방식 매우 다름
    <br />세 라이브러리 모두 마이크로 상태관리에  적합, 코딩스타일과 렌더링 최적화 접근방식 다름
    
    <br /><br /><div>&diams; <strong>Zustand와 Redux의 차이점</strong></div>
    <br /> 유사점
    <br /> 단방향 데이터 흐름을 기반 -> 상태를 갱신하라는 Action을 실행, 통해서 상태갱신 후 새로운 상태 전파
    <br /> dispatch와 전파를 분리하는 것은 데이터 흐름을 단순화, 전체시스템을 예측에 용이
    <br /> 차이점
    <br /> 상태를 갱신하는방법 Redux는 리듀서 기반 - 이전상태와 action 객체를 받아 새로운 상태를 반환하는 순수함수
    <br /> 상태를 갱신하는방법 Zustand는 반드시 리듀서를 사용해 상태갱신할 필요 없음
    <br /> 공식 Redux 튜도리얼 중 하나 - Redux Toolkit을 이용한 최신 리덕스 사용법
    <br /> ㄴ Redux 스토어를 생성하라면 Redux Toolkit 라이브러리의 configureStore를 사용


  </div>
  );
}